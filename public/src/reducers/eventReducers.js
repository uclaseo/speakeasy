/**
 * do we need state? how is state used?
 * how can we only update one state in redux 
 */

export default function(state = null, action){
  switch(action.type){
    case 'UPDATE_ACTIVE_EVENT_ID':
      return action.payload
  }

  return state
}