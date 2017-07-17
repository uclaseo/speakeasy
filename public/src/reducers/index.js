import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducers';
import eventReducer from './eventReducers';
import eventMessagesReducers from './eventMessagesReducers';
import enterEventReducers from './enterEventReducers';
import openEventsReducers from './openEventsReducers';
import activeEventReducers from './activeEventReducers';
import activeEventLocationReducers from './activeEventLocationReducer';


const rootReducer = combineReducers({
  profile: authReducer,
  form: formReducer,
  eventId: eventReducer,
  event_messages: eventMessagesReducers,
  in_event: enterEventReducers,
  open_events: openEventsReducers,
  active_event: activeEventReducers,
  active_event_Location: activeEventLocationReducers
})

export default rootReducer;
