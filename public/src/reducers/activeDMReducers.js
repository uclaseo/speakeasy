export default function(state = null, action) {
  switch(action.type) {
    case 'SET_ACTIVE_DM_ROOM':
      return action.payload;
    case 'CREATE_DM_ROOM':
      return action.payload;
    default: return state;
  }
}