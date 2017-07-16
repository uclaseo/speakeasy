export default function(state = [], action) {
  switch(action.type) {
    case 'NEW_DM_ROOM':
      return [...state, action.payload];
    case 'SET_DM_ROOMS':
      return action.payload;
    default: return state;
  }
}
 
