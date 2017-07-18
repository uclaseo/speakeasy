export default function(state = [], action) {
  switch(action.type) {
    case 'FETCH_DM_ROOMS':
      return action.payload.data.dm_rooms;
    default: return state;
  }
}
 
