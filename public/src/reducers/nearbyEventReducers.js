import {setNearbyEvents} from '../actions/index.js'

export default function(state = [], action){
  switch(action.type){
    case 'SET_NEARBY_EVENTS':
      if (action.payload.length === 0) {
        return state;
      } else {
        return action.payload;
      }
    default:
      return state;
  }
}

//this.props.eventReducer.event_id