import {fetchActiveEventId} from '../actions/index.js'

export default function(state = {}, action){

  switch(action.type){
    case 'SET_ACTIVE_EVENT_ID':
      console.log("3 event reducer's actionpayload", action.payload)
      // return {event_id: action.payload}
      return Object.assign({}, {eventId: action.payload})
    default:
      return state;
  }
}

//this.props.eventReducer.event_id