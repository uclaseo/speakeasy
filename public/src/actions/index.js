import axios from 'axios';

export const EDIT_PROFILE = 'EDIT_PROFILE';
export const ENTER_EVENT = 'ENTER_EVENT';
export const LEAVE_EVENT = 'LEAVE_EVENT';

export function editUserProfile(values, id) {
  console.log('editUserProfile action creator fired!:', values, id);
  const url = `api/user/profile/${id}`;
  const request = axios.put(url)
    .then(res => console.log('AXIOS:', res)); //change
  return {
    type: EDIT_PROFILE,
    payload: request
  };
}

export function setActiveEventId(activeEventId){
  console.log("Step 2, activeEventId in action ", activeEventId)
  return {
    type : "SET_ACTIVE_EVENT_ID",
    payload: activeEventId
  }
}

export function enterEvent() {
  return {
    type: 'ENTER_EVENT',
    payload: true
  }
}

export function leaveEvent() {
  return {
    type: 'LEAVE_EVENT',
    payload: false
  }
}
export function setCurrentEventLocation(currentEventLocation){
  console.log("2, currentLocation in action, lat:", currentEventLocation.lat, "long: ", currentEventLocation.lng );
  return {
    type: "SET_CURRENT_EVENT_LOCATION",
    payload: currentEventLocation
  }
}

export function setNearbyEvents (nearbyEvents){
  console.log("nearbyEvents step 2, nearbyEvents are", nearbyEvents);
  return{
    type: "SET_NEARBY_EVENTS",
    payload: nearbyEvents
  }
}

// export function fetchActiveEventId(activeEventId){
//   console.log("activeEventId in action index.js", activeEventId)
//   return {
//     type : GET_ACTIVE_EVENT_ID,
//     payload: activeEventId
//   }
// }