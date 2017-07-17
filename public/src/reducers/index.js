import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducers';
import eventReducer from './eventReducers';
import eventMessagesReducers from './eventMessagesReducers';
import enterEventReducers from './enterEventReducers';
import openEventsReducers from './openEventsReducers';
import activeEventReducers from './activeEventReducers';
import activeEventLocationReducers from './activeEventLocationReducer';
import nearbyEventReducers from './nearbyEventReducers';
import dmRoomsReducers from './dmRoomsReducers';
import activeDMReducers from './activeDMReducers';
// import dmMessageReducers from './dmMessageReducers';


const rootReducer = combineReducers({
  profile: authReducer,
  form: formReducer,
  eventId: eventReducer,
  event_messages: eventMessagesReducers,
  in_event: enterEventReducers,
  open_events: openEventsReducers,
  active_event: activeEventReducers,
  active_event_Location: activeEventLocationReducers,
  nearbyEvents : nearbyEventReducers,
  dmRooms: dmRoomsReducers,
  activeDMRoom: activeDMReducers,
  dmMessages: dmMessageReducers
})

export default rootReducer;
