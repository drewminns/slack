import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import profileReducer from './profile_reducer';
import fileReducer from './file_reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  profileInfo: profileReducer,
  files: fileReducer
});

export default rootReducer;