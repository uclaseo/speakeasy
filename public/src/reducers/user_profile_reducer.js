import { EDIT_PROFILE } from '../actions/index';

export default function(state = {}, action) {
  if (action.type === EDIT_PROFILE) {
    console.log('ACTION', action.action.payload.data);
    return state;
  }
  return state;
}
