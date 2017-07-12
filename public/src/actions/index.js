import axios from 'axios';

/*
///// EXAMPLE ACTION CREATOR WITH AXIOS REQUEST /////

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city, country = 'US') {
  let url = `http://someUrlWhatever.com/etc`;
  let request = axios.get(url);
  return {
    type: FETCH_WEATHER,
    payload: request
  };
}
*/
const BASE_URL = 'http://localhost:3000/api';
const EDIT_PROFILE = 'EDIT_PROFILE';

export function editUserProfile(values, id) {
  let url = `${BASE_URL}/user/profile/${id}`;
  let request = axios.get(url); //change
  console.log('request:', request);
  return {
    type: EDIT_PROFILE,
    payload: request
  };
}
