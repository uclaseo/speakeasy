import {fetchProfile, GET_PROFILE} from '../actions/authAction';

export default function(state = {}, action) {
  // console.log(action.payload);
  switch (action.type) {
    case GET_PROFILE:
      return {
        profile: action.payload
      }
    default:
      return state;
  }
}