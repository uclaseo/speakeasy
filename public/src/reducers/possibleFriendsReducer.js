export default function(state = [], action) {
  switch(action.type) {
    case 'FETCH_POSSIBLE_FRIENDS':
      return action.payload.data;
    case 'CLEAR_POSSIBLE_FRIENDS':
      return action.payload  
    default:
      return state;
  }
}