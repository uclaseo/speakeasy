export default function(state = [], action) {
  switch(action.type) {
    case 'RECENT_EVENT_MESSAGES':
      if (action.payload.length === 0) {
        return state;
      } else {
        return [...state, action.payload];
      }
      
    case 'NEW_EVENT_MESSAGE':
      return [...state, action.payload];
    default: return state;
  }
}