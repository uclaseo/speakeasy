import { SET_ISVISITED, setIsVisited } from '../actions/index.js';


export default function(state = {}, action) {
  // console.log("step3 setIsVisited action.payload is", action.payload)
  switch (action.type) {
    case SET_ISVISITED:
      return action.payload;
    default:
      return state;
  }
}
