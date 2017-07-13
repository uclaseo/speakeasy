import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducers';
import eventReducer from './eventReducers';


const rootReducer = combineReducers({
  authReducer,
  form: formReducer,
  eventReducer
});



export default rootReducer;
