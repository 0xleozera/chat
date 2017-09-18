import * as React from 'react';
import * as ReactDOM from 'react-dom';

class ChatHistory extends React.Component {
  static propTypes = {
    history: React.PropTypes.array,
    fetchHistory: React.PropTypes.func,
  };

  // Função para detectar o comportamento do scroll, será ativada caso atualiza-se uma mensagem no histórico
  componentWillUpdate(nextProps) {
    this.historyChanged = nextProps.history.length !== this.props.history.length;
    if (this.historyChanged) {
      const { messageList } = this.refs;
      const scrollPos = messageList.scrollTop;
      const scrollBottom = (messageList.scrollHeight - messageList.clientHeight);
      this.scrollAtBottom = (scrollBottom === 0) || (scrollPos === scrollBottom);
      if (!this.scrollAtBottom) {
        const numMessages = messageList.childNodes.length;
        this.topMessage = numMessages === 0 ? null : messageList.childNodes[0];
      }
    }
  }

  // Caso a função acima notar o comportamento de scroll, essa função autoriza a rolagem para a última mensagem com a função ScrollToBottom
  componentDidUpdate() {
    if (this.historyChanged) {
      if (this.scrollAtBottom) {
        this.scrollToBottom();
      }
      if (this.topMessage) {
        ReactDOM.findDOMNode(this.topMessage).scrollIntoView();
      }
    }
  }

  // Quando for scrollado para o topo, a função recarregará o histórico
  onScroll = () => {
    const { refs, props } = this;
    const scrollTop = refs.messageList.scrollTop;
    if (scrollTop === 0) {
      props.fetchHistory();
    }
  };

  render() {
    const { props, onScroll } = this;
    return (
      <ul className="collection" ref="messageList" onScroll={ onScroll }>
        { props.history.map((messageObj) => {
          const imgURL = '//robohash.org/' + messageObj.Who + '?set=set2&bgset=bg2&size=70x70';
          const messageDate = new Date(messageObj.When);
          const messageDateTime = messageDate.toLocaleDateString() +
            ' às ' + messageDate.toLocaleTimeString() + ' horas';
          return (
            <li className="collection-item avatar" key={ messageObj.When }>
              <img src={ imgURL } alt={ messageObj.Who } className="circle" />
              <span className="title">Usuário #{ messageObj.Who }</span>
              <p>
                <i className="prefix mdi-action-alarm" />
                <span className="message-date">{ messageDateTime }</span>
                <br />
                <span>{ messageObj.What }</span>
              </p>
            </li>
          );
        }) }
      </ul>
    );
  }

  static scrollAtBottom = true;

  // Toda vez que recarregar o chat, o histórico rola automaticamente para baixo até a ultima mensagem
  scrollToBottom = () => {
    const { messageList } = this.refs;
    const scrollHeight = messageList.scrollHeight;
    const height = messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }
}

export default ChatHistory;
