import Auth from '../Auth0/Auth0';

const auth = new Auth();

export const GET_PROFILE = 'GET_PROFILE';

export function fetchProfile(profile) {
  console.log('profile in action', profile);
  return {
    type: GET_PROFILE,
    payload: profile
  };
}