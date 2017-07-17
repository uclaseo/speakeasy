import axios from 'axios'

export const FETCH_DM_ROOMS = 'FETCH_DM_ROOMS'
export const SET_ACTIVE_DM_ROOM = 'SET_ACTIVE_DM_ROOM'

export function fetchDMRooms(userId) {
  let url = `/api/dmrooms/${userId}`
  let request = axios.get(url)
  return { 
    type: FETCH_DM_ROOMS,
    payload: request
  }
} 

export function setActiveDMRoom(room) {
  return {
    type: SET_ACTIVE_DM_ROOM,
    payload: room
  }
}