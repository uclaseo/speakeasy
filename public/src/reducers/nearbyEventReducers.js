import {setNearbyEvents} from '../actions/index.js'

export default function(state = {}, action){
  console.log("nearbyEvents Reducer 3")
  switch(action.type){
    case 'SET_NEARBY_EVENTS':
      return Object.assign({}, {nearbyEvents: action.payload})
    default:
      return state;
  }
}

//this.props.eventReducer.event_id