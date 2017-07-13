import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducers';

const rootReducer = combineReducers({
  authReducer,
  form: formReducer
});

export default rootReducer;
