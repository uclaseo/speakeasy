import axios from 'axios';

export const GET_PROFILE = 'GET_PROFILE';
export function fetchProfile(profile) {
  const request = axios.get(`api/user/profile/${profile.id}`);
  return {
    type: GET_PROFILE,
    payload: request
  };
}

export const EDIT_PROFILE = 'EDIT_PROFILE';
export function editUserProfile(profile) {
  const request = axios.put(`api/user/profile/${profile.id}`, profile);
  return {
    type: EDIT_PROFILE,
    payload: request
  };
}