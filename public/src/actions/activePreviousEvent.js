import axios from 'axios';

export const SET_ACTIVE_PREVIOUS_EVENT = 'SET_ACTIVE_PREVIOUS_EVENT';
export const CLEAR_ACTIVE_PREVIOUS_EVENT = 'CLEAR_ACTIVE_PREVIOUS_EVENT';

export function setActivePreviousEvent(event) {
  const request = axios.get(`/api/event/image/fetcheventimages/${event.eventId}`)
  return {
    type: SET_ACTIVE_PREVIOUS_EVENT,
    payload: request
  }
}

export function clearActivePreviousEvent() {
  return {
    type: CLEAR_ACTIVE_PREVIOUS_EVENT,
    payload: []
  }
}