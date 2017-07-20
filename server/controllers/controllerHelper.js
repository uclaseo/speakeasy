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

function parseFriendsList(input) {
  var friends = [];
  for(var i = 0; i < input[0][0].possible.length; i++) {
    var friendA = {};
    if (input[0][0].possible[i].cross_path.count > 2) {
      if (input[0][0].possible[i].cross_path.chatting === false) {
        friendA.user_to_name = input[0][0].possible[i].name;
        friendA.user_to_id = input[0][0].possible[i].id;
        friendA.cross_path = input[0][0].possible[i].cross_path.count;
        friendA.id = input[0][0].possible[i].cross_path.id;
        friends.push(friendA);
      }
    }
  }
  for(var j = 0; j < input[1].length; j++) {
    if (input[1][j].possible[0].cross_path.count > 2) {
      if (input[1][j].possible[0].cross_path.chatting === false) {
        var friendB = {};
        friendB.user_to_name = input[1][j].name;
        friendB.user_to_id = input[1][j].id;
        friendB.cross_path = input[1][j].possible[0].cross_path.count;
        friendB.id = input[1][j].possible[0].cross_path.id;
        friends.push(friendB)
      }
    }
  } 
  return friends;
}

module.exports = {
  parseDMRooms: parseDMRooms,
  parseFriendsList: parseFriendsList
}