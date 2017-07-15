import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import io from 'socket.io-client'
import ChatDetail from '../components/chatDetail'
import ChatLog from '../components/chatLog'
import { Image, Glyphicon, InputGroup, PageHeader, Col, Button, FormGroup, FormControl } from 'react-bootstrap'
import { recentEventMessages, newEventMessage } from '../actions/eventMessagesActions'
import { enterEvent, leaveEvent } from '../actions/index';

const socket = io();

class EventChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSendClick = this.handleSendClick.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this._handleLogIn = this._handleLogIn.bind(this)
    this._handleLogOut = this._handleLogOut.bind(this)
    this._handleRefreshMessages = this._handleRefreshMessages.bind(this)
    this._handleRecentMessages = this._handleRecentMessages.bind(this)   
  }


  componentDidMount() {
    this._handleLogIn()
    this._handleRecentMessages()
    this._handleRefreshMessages()
  }

  componentWillUnmount() {
<<<<<<< HEAD
    socket.removeAllListeners();
=======
    socket.disconnect()
>>>>>>> add clear event messages
  }

  handleInputChange(e) {
    this.setState({
      text: e.target.value
    })
  }

  handleSendClick(event) {
    event.preventDefault()
    socket.emit('newmessage', {
      event_id: this.props.event_id,
      user_name: this.props.user_name,
      text: this.state.text
    })
    this.setState({
      text: ''
    })
   
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      socket.emit('newmessage', {
        event_id: this.props.event_id,
        user_name: this.props.user_name,
        text: this.state.text
      })
      this.setState({
        text: ''
      })
    }
  }
  
  _handleLogIn() {
    socket.connect();
    socket.emit('enterevent', {
      event_id: this.props.event_id,
      user_name: this.props.user_name
    })
    console.log(this.props.messages);
  }

  _handleLogOut() {
    socket.emit('leaveevent', {
      user_name: this.props.user_name,
      event_id: this.props.event_id
    })
  }

  _handleRecentMessages() {
    socket.on('recentmessages', (recentMessages) => {
      this.props.recentEventMessages(recentMessages)
    })
  }

  _handleRefreshMessages() {
    socket.on('refreshmessages', (newMessage) => {
      this.props.newEventMessage(newMessage)
    })
  }

  render() {
    if (this.props.messages.length === 0) {
      return  <div>
                <input  
                  type="text" 
                  value={this.state.text}
                  onKeyPress={this.handleKeyPress}
                  onChange={this.handleInputChange}
                />             
                <button 
                  type="button" 
                  onClick={this.handleSendClick}
                > Send </button> 
              </div>
    }

    if (!this.props.user_name) {
      return <div>You need to log in</div>
    }

    return (
      <div>   
        <ChatLog roomMessages={this.props.messages}/>
        <input  
          type="text" 
          onChange={this.handleInputChange}
          value={this.state.text}
          onKeyPress={this.handleKeyPress}      
        />             
         <button 
          type="button" 
          onClick={this.handleSendClick}
        > Send </button>           
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    event_id: state.eventId.eventId, 
    user_name: state.profile.name,
    messages: state.event_messages,
    in_event: state.in_event
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    recentEventMessages: recentEventMessages,
    newEventMessage: newEventMessage,
    enterEvent: enterEvent,
    leaveEvent: leaveEvent
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EventChat)