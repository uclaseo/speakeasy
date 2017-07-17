import axios from 'axios';

export const GET_PROFILE = 'GET_PROFILE';
export function fetchProfile(profile) {
  const id = profile.data.id;
  const url = `api/user/profile/${id}`;
  const request = axios.get(url);
  return {
    type: GET_PROFILE,
    payload: request
  }; 
}

export const EDIT_PROFILE = 'EDIT_PROFILE';
export function editUserProfile(values, id, photo) {
  const url = `api/user/profile/${id}`;
  const request = axios.put(url, values);

  return {
    type: EDIT_PROFILE,
    payload: request
  };
}