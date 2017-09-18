import * as React from 'react';

class ChatInput extends React.Component {
  static propTypes = {
    userID: React.PropTypes.number,
    sendMessage: React.PropTypes.func,
  };

  // A cada atualização do chat, ele ja deixa o input selecionado
  componentDidMount() {
    this.refs.txtMessage.focus();
  }

  // Função que altera o comportamento padrão
  onSubmit = (e) => {
    e.preventDefault();

    // Observa se o input está vázio
    const message = this.refs.txtMessage.value;
    if (message.length === 0) {
      return;
    }

    // Cria o objeto de mensagem e envia ele para as funções
    const messageObj = {
      Who: this.props.userID,
      What: message,
      When: new Date().valueOf(),
    };
    this.props.sendMessage(messageObj);

    // Limpa o input e seta ele
    this.refs.txtMessage.value = '';
    this.refs.txtMessage.focus();
  };

  render() {
    const { props, onSubmit } = this;
    const imgURL = '//robohash.org/' + props.userID + '?set=set2&bgset=bg2&size=70x70';
    return (
      <footer className="purple darken-3">
        <form className="container" onSubmit={ onSubmit }>
          <div className="row">
            <div className="input-field col s10">
              <i className="prefix mdi-communication-chat" />
              <input ref="txtMessage" type="text" placeholder="Escreva sua mensagem" />
              <span className="chip left">
                <img src={ imgURL } />
                <span>Usuário #{ props.userID }</span>
              </span>
            </div>
            <div className="input-field col s2">
              <button type="submit" className="waves-effect waves-light btn-floating light-blue btn-large">
                <i className="mdi-content-send" />
              </button>
            </div>
          </div>
        </form>
      </footer>
    );
  }
}

export default ChatInput;
