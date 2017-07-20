import axios from 'axios'

export const FETCH_POSSIBLE_FRIENDS = 'FETCH_POSSIBLE_FRIENDS'

export function fetchPossibleFriends(userId) {
  
  const request = axios.get('/api');
  
  return { 
    type: FETCH_POSSIBLE_FRIENDS, 
    payload: request
  }
}
