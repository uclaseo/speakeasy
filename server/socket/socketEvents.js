const socketEvents = (io) => {
  io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('enter event', (event) => {
      socket.join(event);
      console.log('user joined event ', event);
    });

    socket.on('leave event', (event) => {
      socket.leave(event);
      console.log('user left event ', event);
    });

    socket.on('new message', (event) => {
      io.sockets.in(event).emit('refresh messages', event);
    })

    socket.on('disconnect', () => {
      console.log('user disconnected');
    })

    socket.on('enter dm', (dm) => {
      socket.join(dm);
      console.log('user joined dm ', dm);
    })

    socket.on('leave dm', (dm) => {
      socket.leave(dm);
      console.log('user left dm ', dm);
    })

    socket.on('new dm', (dm) => {
      io.sockets.in(dm).emit('refresh messages', dm);
    })
  })
}

module.exports = socketEvents;