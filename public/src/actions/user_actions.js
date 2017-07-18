import axios from 'axios';

export const GET_PROFILE = 'GET_PROFILE';
export function fetchProfile(profile) {
  const id = profile.id;
  const url = `api/user/profile/${id}`;
  const request = axios.get(url);
  return {
    type: GET_PROFILE,
    payload: request
  };
}

export const EDIT_PROFILE = 'EDIT_PROFILE';
export function editUserProfile(profile, id) {
  const request = axios.put(`api/user/profile/${id}`, profile);
  // console.log('profile!!!!! from action:', profile);
  return {
    type: EDIT_PROFILE,
    payload: request
  };
}