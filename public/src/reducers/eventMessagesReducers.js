export default function(state = [], action) {
  switch(action.type) {
    case 'RECENT_EVENT_MESSAGES':
      if (action.payload.length === 0) {
        return state;
      } else {
        return action.payload;
      }
      
    case 'NEW_EVENT_MESSAGE':
      return [...state, action.payload];

    case 'CLEAR_EVENT_MESSAGES':
      return action.payload;
    default: return state;
  }
}