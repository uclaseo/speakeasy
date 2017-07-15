import axios from 'axios'

export const FETCH_OPEN_EVENTS = 'FETCH_OPEN_EVENTS'

export function fetchOpenEvents() {
  
  const request = axios.get('/api/event/searchevents');
  
  return { 
    type: FETCH_OPEN_EVENTS, 
    payload: request
  }
}

