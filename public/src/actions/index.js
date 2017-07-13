import axios from 'axios';

export const EDIT_PROFILE = 'EDIT_PROFILE';

export function editUserProfile(values, id) {
  const url = `api/user/profile/${id}`;

  const request = axios.get(url)
    .then(res => console.log('AXIOS:', res)); //change
  return {
    type: EDIT_PROFILE,
    payload: request
  };
}

export function provideActiveEventId(activeEventId){
  console.log("in provideActiveEventId function", activeEventId)
  return {
    type : UPDATE_ACTIVE_EVENT_ID,
    payload: activeEventId
  }
}