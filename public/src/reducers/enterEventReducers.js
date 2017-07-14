export default function(state = false, action) {
  switch(action.type) {
    case 'ENTER_EVENT':
      return action.payload;
    case 'LEAVE_EVENT':
      return action.payload;
    default:
      return state;
  }
}