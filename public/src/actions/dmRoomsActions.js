import axios from 'axios'

export const FETCH_DM_ROOMS = 'FETCH_DM_ROOMS'
export const SET_ACTIVE_DM_ROOM = 'SET_ACTIVE_DM_ROOM'
export const CREATE_DM_ROOM = 'CREATE_DM_ROOM'


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


export function createDMRoom(user_to_name, dm_id) {
  // let dmroom = axios.post('/api/dmrooms/create', {
  //   userId: userId,
  //   anotherId: message.user_id
  // })
  return {
    type: CREATE_DM_ROOM,
    payload: { 
      user_to_name: user_to_name,
      dm_id: dm_id
    }
  }
}
