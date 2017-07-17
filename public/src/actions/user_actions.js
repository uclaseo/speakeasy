import axios from 'axios';

export const GET_PROFILE = 'GET_PROFILE';
export function fetchProfile(profile) {
  const id = profile.id;
  const url = `api/user/profile/${id}`;
  const request = axios.get(url)
  console.log('REQUEST from axios', request);
    // .then(res => console.log('AXIOS res:', res))
    // .catch(err => 'axios error', err);
    
  return {
    type: GET_PROFILE,
    payload: request
  }; 
}

export const EDIT_PROFILE = 'EDIT_PROFILE';
export function editUserProfile(values, id) {
  const url = `api/user/profile/${id}`;
  const request = axios.put(url, values)
    // .then(res => console.log('AXIOS:', res)) //change
    // .catch(err => 'axios error', err);

  return {
    type: EDIT_PROFILE,
    payload: request
  };
}