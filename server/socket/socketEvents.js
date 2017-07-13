const Message = require('./../models/messageModel');
const DirectMessage = require('./../models/dmModel');

const socketEvents = (io) => {
  io.on('connection', (socket) => {
    console.log('is socket working?????', socket.connected);

    // Event message socket events
    socket.on('enterevent', (event) => {
      socket.join(event.event_id);
      socket.room = event.event_id;
      console.log('user ', event.user_name, 'joined room ', socket.room);
      Message.find({ event_id: event.event_id })
        .select('createdAt text user_name event_id')
        .sort('-createdAt')
        .limit(25)
        .exec((err, messages) => {
          if (err) console.error('error getting recent messages ', err);
          console.log('enter event recent messages ', messages);
          io.sockets.in(event.event_id).emit('recentmessages', messages);
        })

    });

    socket.on('leaveevent', (event) => {
      socket.leave(event);
      console.log('user left room ', event);
    });

    socket.on('newmessage', (data) => {
      console.log('posting a new message ', data);
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

    // direct message socket events
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
      const { dm_id, user_from_name, user_to_name, text } = data;
      const newDM = new DirectMessage({
        dm_id: dm_id,
        user_from_name: user_from_name,
        user_to_name: user_to_name,
        text: text
      });
      newDM.save((err, message) => {
        if (err) console.error('error posting DM ', err);
        io.sockets.in(data.dm_id).emit('refreshmessages', message);
      })
    });

    socket.on('disconnect', () => {
      console.log('user disconnected ', socket.connected);
    });
  })
}

module.exports = socketEvents;