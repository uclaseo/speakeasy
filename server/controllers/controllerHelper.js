const Table = require('./../models/tableModels');

const parseDMRooms = (input) => {
  var rooms = [];
  for(var i = 0; i < input[0][0].another.length; i++) {
    var roomA = {};
    roomA.user_to_name = input[0][0].another[i].name;
    roomA.dm_id = input[0][0].another[i].dm_room.id;
    rooms.push(roomA);
  }
  for(var j = 0; j < input[1].length; j++) {
    var roomB = {};
    roomB.user_to_name = input[1][j].name;
    roomB.dm_id = input[1][j].another[0].dm_room.id;
    rooms.push(roomB)
  } 
  return rooms;
}

const fetchUsersForEvent = (eventId) => {
  Table.User_Event.findAll({
    where: { eventId: eventId },
    attributes: ['userId']
  })
} 

module.exports = {
  parseDMRooms: parseDMRooms,
  fetchUsersForEvent: fetchUsersForEvent
}