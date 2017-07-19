import {setNearbyEvents} from '../actions/index.js'

export default function(state = [], action){
  switch(action.type){
    case 'SET_NEARBY_EVENTS':
      console.log('set nearby events payload ', action.payload);
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