import { combineReducers } from 'redux';
import globalReducer from './global';
import user from './user';

const rootReducer = combineReducers({ globalReducer, user });

export default rootReducer;