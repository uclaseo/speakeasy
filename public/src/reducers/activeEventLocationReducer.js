import {setCurrentEventLocation} from '../actions/index.js'

export default function(state = {}, action){

  switch(action.type){
    
    case 'SET_CURRENT_EVENT_LOCATION':
      console.log("3 event reducer's location payload", action.payload)
      return Object.assign({}, {currentEventLocation : action.payload})

    default:
      return state;
  }
}

//this.props.eventReducer.event_id