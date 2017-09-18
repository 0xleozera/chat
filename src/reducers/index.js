import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import appReducer from './app';

// Incluindo o App Reducer
const rootReducer = combineReducers({
  routing: routerReducer,
  app: appReducer,
});

export default rootReducer;
