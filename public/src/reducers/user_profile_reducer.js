import { EDIT_PROFILE } from '../actions/index';

export default function(state = {}, action) {
  if (action.type === EDIT_PROFILE) {
    return state;
  }
  return state;
}
