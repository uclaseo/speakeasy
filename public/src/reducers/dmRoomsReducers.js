export default function(state = [], action) {
  switch(action.type) {
    case 'NEW_DM_ROOM':
      return [...state, action.payload];
    case 'FETCH_DM_ROOMS':
      // function parseDMRooms(input) {
      //   let rooms = [];
      //   for (let i = 0; i < input[0][0].another.length; i++) {
      //     let roomA = {};
      //     roomA.user_to_name = input[0][0].another[i].name;
      //     roomA.dm_id = input[0][0].another[i].dm_room.id;
      //     rooms.push(roomA);
      //   }
      //   for (let j = 0; j < input[1].length; j++) {
      //     let roomB = {};
      //     roomB.user_to_name = input[1][j].name;
      //     roomB.dm_id = input[1][j].another[0].dm_room.id;
      //     rooms.push(roomB)
      //   } 
      //   return rooms;
      // }
      // let dmrooms = parseDMRooms(action.payload.data.dm_rooms);
      return action.payload.data.dm_rooms;
    default: return state;
  }
}
 
