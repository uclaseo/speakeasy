import axios from 'axios';

export const ENTER_EVENT = 'ENTER_EVENT';
export const LEAVE_EVENT = 'LEAVE_EVENT';

export function setActiveEventId(activeEventId){
  console.log("Step 2, activeEventId in action ", activeEventId)
  return {
    type : "SET_ACTIVE_EVENT_ID",
    payload: activeEventId
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