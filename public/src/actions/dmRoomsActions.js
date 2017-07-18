import axios from 'axios'

export const FETCH_DM_ROOMS = 'FETCH_DM_ROOMS'
export const SET_ACTIVE_DM_ROOM = 'SET_ACTIVE_DM_ROOM'
export const CREATE_DM_ROOM = 'CREATE_DM_ROOM'


export function fetchDMRooms(userId) {
  let url = `/api/dmrooms/${userId}`
  let request = axios.get(url)
  console.log(request);
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


export function createDMRoom(userToId, userFromId) {
  let dmroom = axios.post('/api/dmrooms/create', {
    userId: userFromId,
    anotherId: userToId
  })
  return {
    type: CREATE_DM_ROOM,
    payload: dmroom
  }
}
