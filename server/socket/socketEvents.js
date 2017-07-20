const Message = require('./../models/messageModel');
const DirectMessage = require('./../models/dmModel');

const socketEvents = (io) => {
  io.on('connect', (socket) => {
    console.log('is socket working?????', socket.connected);

    // Event message socket events
    socket.on('enterevent', (event) => {
      socket.join(event.event_id);
      socket.room = event.event_id;
      console.log('user ', event.user_name, 'joined room ', socket.room);
      var room = io.sockets.adapter.rooms[socket.room];
      console.log('room number is ', room.length);
      Message.find({ event_id: event.event_id })
        .select('createdAt text user_name event_id user_id _id')
        .sort('-createdAt')
        .limit(7)
        .exec((err, messages) => {
          if (err) console.error('error getting recent messages ', err);
          console.log('enter event recent messages ', messages);
          io.sockets.in(event.event_id).emit('recentmessages', messages);
        })
    });

    socket.on('leaveevent', (event) => {
      socket.leave(event.event_id);
    });

    socket.on('newmessage', (data, images) => {
      console.log('posting a new message ', data);
      console.log('images data', images);
      const { event_id, user_name, text, user_id } = data;
      const newMessage = new Message({
        event_id: event_id,
        user_name: user_name,
        user_id: user_id,
        text: text
      });
      newMessage.save((err, message) => {
        if (err) console.error('error posting message ', err);
        io.sockets.in(data.event_id).emit('refreshmessages', message);
      })
    });

    socket.on('closeevent', (data) => {
      io.of('/').in(data.event_id).clients((error, clients) => {
        if (error) throw error;
        console.log('these are the room clients ', clients);
        clients.forEach((client) => {
          io.sockets.connected[client].leave(data.event_id);
        });
      });
      io.sockets.in(data.event_id).emit('eventclosed');
    });

    // direct message socket events
    socket.on('enterdm', (dmroom) => {
      socket.join(dmroom.dm_id);
      socket.room = dmroom.dm_id;
      console.log('user joined dm room ', socket.room);
      DirectMessage.find({ dm_id: dmroom.dm_id })
        .select('createdAt user_from_name text dm_id _id')
        .sort('-createdAt')
        .limit(7)
        .exec((err, dms) => {
          if (err) console.error('error getting recent dms ', err);
          io.sockets.in(dmroom.dm_id).emit('recentdms', dms);
        })
    });

    socket.on('leavedm', (dmroom) => {
      socket.leave(dmroom.dm_id);
      console.log('user left room ', dmroom.dm_id);
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
        io.sockets.in(data.dm_id).emit('refreshdms', message);
      })
    });

    socket.on('disconnect', () => {
      console.log('user disconnected ', socket.connected);
    });
  })
}

module.exports = socketEvents;