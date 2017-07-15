export const SET_ACTIVE_EVENT = 'SET_ACTIVE_EVENT';

export function setActiveEvent(event) {
  return {
    type: SET_ACTIVE_EVENT,
    payload: event
  }
}