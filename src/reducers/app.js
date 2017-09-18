import { ADD_MESSAGE, SET_CURRENT_USERID, ADD_HISTORY } from '../constants';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  userID: 0,
  messages: [],
  lastMessageTimestamp: null,
});

function appReducer(state = INITIAL_STATE, action = {}) {
  // Switch para definir quais ações e instruções serão passadas
  switch (action.type) {
  case SET_CURRENT_USERID:
    return state.update('userID', () => action.payload);
  case ADD_MESSAGE:
    return state.update('messages', (messages) => messages.concat(action.payload));
  case ADD_HISTORY:
    return state
      .update('messages', (messages) => messages.unshift(...action.payload.messages))
      .update('lastMessageTimestamp', () => action.payload.timestamp);
  default:
    return state;
  }
}

export default appReducer;

