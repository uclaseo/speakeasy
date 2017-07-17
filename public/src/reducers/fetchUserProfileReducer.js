import { fetchProfile, GET_PROFILE } from '../actions/user_actions';

export default function(state = {}, action) {
  console.log('ACTION.PAYLOAD FROM REDUCER:', action.payload);

  switch (action.type) {
    case GET_PROFILE:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
}

