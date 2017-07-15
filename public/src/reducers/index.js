import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducers';
import eventReducer from './eventReducers';
import eventMessagesReducers from './eventMessagesReducers';
import enterEventReducers from './enterEventReducers';
import openEventsReducers from './openEventsReducers';


const rootReducer = combineReducers({
  profile: authReducer,
  form: formReducer,
  eventId: eventReducer,
  event_messages: eventMessagesReducers,
  in_event: enterEventReducers,
  open_events: openEventsReducers,
  event: eventReducer
  
});



export default rootReducer;
