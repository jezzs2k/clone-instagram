import { combineReducers } from 'redux';

import AuthReducer from './authReducer';
import userReducer from './userReducer';
import storyReducer from './storyReducer';

export default combineReducers({
  auth: AuthReducer,
  user: userReducer,
  story: storyReducer,
});
