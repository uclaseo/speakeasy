import axios from 'axios';

export const SET_ACTIVE_EVENT = 'SET_ACTIVE_EVENT';

export function setActiveEvent(event, user_id) {
  if (event.id !== undefined && user_id !== undefined) {
    axios.post('/api/event/joinevent', { eventId: event.id, userId: user_id});
  }
  return {
    type: SET_ACTIVE_EVENT,
    payload: event
  }
}