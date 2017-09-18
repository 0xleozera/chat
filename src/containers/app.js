import React from 'react';
import { connect } from 'react-redux';
import ChatInput from '../components/ChatInput';
import ChatHistory from '../components/ChatHistory';
import { setCurrentUserID, addMessage, addHistory } from '../actions';

// Mantém atualizado os objetos com as ações do Redux
function mapStateToProps(state) {
  return {
    history: state.app.get('messages').toJS(),
    userID: state.app.get('userID'),
    lastMessageTimestamp: state.app.get('lastMessageTimestamp'),
  };
}

// Conecta as ações criadas com Redux com o chat
function mapDispatchToProps(dispatch) {
  return {
    addMessage: (message) => dispatch(addMessage(message)),
    setUserID: (userID) => dispatch(setCurrentUserID(userID)),
    addHistory: (messages, timestamp) => dispatch(addHistory(messages, timestamp)),
  };
}

class App extends React.Component {
  static propTypes = {
    history: React.PropTypes.array,
    userID: React.PropTypes.number,
    addMessage: React.PropTypes.func,
    setUserID: React.PropTypes.func,
    addHistory: React.PropTypes.func,
    lastMessageTimestamp: React.PropTypes.string,
  };

  // Gera os números randômicos dos usuários e conecta com a API e Redux
  componentDidMount() {
    const ID = Math.round(Math.random() * 1000000);
    this.props.setUserID(ID);
    this.PubNub = PUBNUB.init({
      publish_key: 'pub-c-199f8cfb-5dd3-470f-baa7-d6cb52929ca4',
      subscribe_key: 'sub-c-d2a5720a-1d1a-11e6-8b91-02ee2ddab7fe',
      ssl: (location.protocol.toLowerCase() === 'https:'),
    });
    this.PubNub.subscribe({
      channel: 'ReactChat',
      message: this.props.addMessage,
    });
    // Busca o histórico de mensagens ao carregar o aplicativo
    this.fetchHistory();
  }

  render() {
    const { props, sendMessage, fetchHistory } = this;
    return (
      <div>
        <ChatHistory history={ props.history } fetchHistory={ fetchHistory } />
        <ChatInput userID={ props.userID } sendMessage={ sendMessage } />
      </div>
    );
  }

  fetchHistory = () => {
    const { props } = this;
    this.PubNub.history({
      channel: 'ReactChat',
      count: 15,
      start: props.lastMessageTimestamp,
      callback: (data) => {
        // Data é um array, onde o índice 0 é um array de mensagens
        // Índice 1 é a data de início das mensagens
        props.addHistory(data[0], data[1]);
      },
    });
  }

  sendMessage = (message) => {
    this.PubNub.publish({
      channel: 'ReactChat',
      message: message,
    });
  }
}

export default connect(
  // Conectar o Redux com o chat React
  mapStateToProps,
  mapDispatchToProps,
)(App);
