import axios from 'axios'

export const FETCH_POSSIBLE_FRIENDS = 'FETCH_POSSIBLE_FRIENDS'
export const CLEAR_POSSIBLE_FRIENDS = 'CLEAR_POSSIBLE_FRIENDS'

export function fetchPossibleFriends(userId, dmRooms) {
  
  const request = axios.get('/api/friendsuggestion/' + userId);
  
  return { 
    type: FETCH_POSSIBLE_FRIENDS, 
    payload: request
  }
}

export function clearPossibleFriends() {
  return {
    type: CLEAR_POSSIBLE_FRIENDS,
    payload: []
  }
}
