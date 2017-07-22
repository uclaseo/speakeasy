import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import fetchUserProfileReducer from './fetchUserProfileReducer';
import eventReducer from './eventReducers';
import eventMessagesReducers from './eventMessagesReducers';
import enterEventReducers from './enterEventReducers';
import openEventsReducers from './openEventsReducers';
import activeEventReducers from './activeEventReducers';
import activeEventLocationReducers from './activeEventLocationReducer';
import nearbyEventReducers from './nearbyEventReducers';
import dmRoomsReducers from './dmRoomsReducers';
import activeDMReducers from './activeDMReducers';
import dmMessageReducers from './dmMessageReducers';
import possibleFriendsReducer from './possibleFriendsReducer';
import isViistedReducer from './isVisitedReducer'

const rootReducer = combineReducers({
  profile: fetchUserProfileReducer,
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
  dm_messages: dmMessageReducers,
  possibleFriends: possibleFriendsReducer,
  isVisited: isViistedReducer
})

export default rootReducer;
