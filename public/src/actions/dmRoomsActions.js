import axios from 'axios'

export const SET_DM_ROOMS = 'SET_DM_ROOMS'

export function setDMRooms(user) {
  let request = axios.get()
  return { 
    type: SET_DM_ROOMS,
    payload: request
  }
} 