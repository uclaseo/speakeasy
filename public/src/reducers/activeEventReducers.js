export default function(state = null, action) {
  switch(action.type) {
    case 'SET_ACTIVE_EVENT':
      return action.payload;
    default: return state;
  }
}