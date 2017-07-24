import {SET_ACTIVE_PREVIOUS_EVENT, CLEAR_ACTIVE_PREVIOUS_EVENT} from '../actions/activePreviousEvent';

export default function(state = [], action) {
  switch(action.type) {
    case SET_ACTIVE_PREVIOUS_EVENT:
      return action.payload.data;

    case CLEAR_ACTIVE_PREVIOUS_EVENT:
      return action.payload;

    default: return state;
  }
}