import { fetchProfile, GET_PROFILE, EDIT_PROFILE } from '../actions/user_actions';

export default function(state = {}, action) {

  switch (action.type) {
    case GET_PROFILE:
      return Object.assign({}, action.payload.data);
    case EDIT_PROFILE:
      return Object.assign({}, state, action.payload.data);
    default:
      return state;
  }
}

