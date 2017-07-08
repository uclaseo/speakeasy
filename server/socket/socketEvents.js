const Message = require('./../models/messageModel');
const DirectMessage = require('./../models/dmModel');

const socketEvents = (io) => {
  io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('enterevent', (event) => {
      socket.join(event);
      socket.room = event;
      console.log('user joined room ', socket.room);
      Message.find({ event_id: event })
        .select('createdAt text user_name')
        .sort('-createdAt')
        .limit(25)
        .exec((err, messages) => {
          if (err) console.error('error getting recent messages ', err);
          io.sockets.in(event).emit('recentmessages', messages);
        })

    });

    socket.on('leaveevent', (event) => {
      socket.leave(event);
      console.log('user left room ', event);
    });

    socket.on('newmessage', (data) => {
      const { event_id, user_name, text } = data;
      const newMessage = new Message({
        event_id: event_id,
        user_name: user_name,
        text: text
      });
      newMessage.save((err, message) => {
        if (err) console.error('error posting message ', err);
        io.sockets.in(data.event_id).emit('refreshmessages', message);
      })
    });

    socket.on('enterdm', (dmroom) => {
      socket.join(dmroom);
      socket.room = dmroom;
      console.log('user joined dm room ', socket.room);
      DirectMessage.find({ dm_id: dmroom })
        .select('createdAt user_from_name text')
        .sort('-createdAt')
        .limit(25)
        .exec((err, dms) => {
          if (err) console.error('error getting recent dms ', err);
          io.sockets.in(dmroom).emit('recentdms', dms);
        })
    });

    socket.on('leavedm', (dmroom) => {
      socket.leave(dmroom);
      console.log('user left room ', dmroom);
    });

    socket.on('newdm', (data) => {
      io.sockets.in(data.dm_id).emit('refreshmessages', data);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  })
}

module.exports = socketEvents;