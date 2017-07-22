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
export function editUserProfile(changes) {
  const request = axios.put(`api/user/profile/${changes.id}`, changes);
  return {
    type: EDIT_PROFILE,
    payload: request
  };
}