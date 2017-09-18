import { ADD_MESSAGE, SET_CURRENT_USERID, ADD_HISTORY } from '../constants';

// Defini o ID do usuário atual
export function setCurrentUserID(userID) {
  return {
    type: SET_CURRENT_USERID,
    payload: userID,
  };
}

// Guarda o nome dos usuários nas mensagens
export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    payload: message,
  };
}

// Salva as mensagens
export function addHistory(messages, timestamp) {
  return {
    type: ADD_HISTORY,
    payload: {
      messages,
      timestamp,
    },
  };
}
