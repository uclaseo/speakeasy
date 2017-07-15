export default function(state = [], action) {
  // console.log('why wont you run?');
  switch(action.type) {
    case 'FETCH_OPEN_EVENTS':
      return action.payload.data;
    default:
      return state;
  }
}