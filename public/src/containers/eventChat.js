<<<<<<< HEAD
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';
import ChatDetail from '../components/chatDetail';
import ChatLog from '../components/chatLog';
import {
  Image,
  Glyphicon,
  InputGroup,
  PageHeader,
  Col,
  Button,
  FormGroup,
  FormControl
} from 'react-bootstrap';
import {
  recentEventMessages,
  newEventMessage
} from '../actions/eventMessagesActions';
import { enterEvent, leaveEvent } from '../actions/index';
=======
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import io from 'socket.io-client'
import ChatDetail from '../components/chatDetail'
import ChatLog from '../components/chatLog'
import { Image, Glyphicon, InputGroup, PageHeader, Col, Button, FormGroup, FormControl } from 'react-bootstrap'
import { recentEventMessages, newEventMessage } from '../actions/eventMessagesActions'
import { createDMRoom } from '../actions/dmRoomsActions'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
>>>>>>> working on create dm room

const socket = io();

class EventChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      closed: false
    };

<<<<<<< HEAD
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSendClick = this.handleSendClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this._handleLogIn = this._handleLogIn.bind(this);
    this._handleLogOut = this._handleLogOut.bind(this);
    this._handleRefreshMessages = this._handleRefreshMessages.bind(this);
    this._handleRecentMessages = this._handleRecentMessages.bind(this);
=======
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSendClick = this.handleSendClick.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleCloseClick = this.handleCloseClick.bind(this)
    this.handleDMClick = this.handleDMClick.bind(this)
    this._handleLogIn = this._handleLogIn.bind(this)
    this._handleLogOut = this._handleLogOut.bind(this)
    this._handleRefreshMessages = this._handleRefreshMessages.bind(this)
    this._handleRecentMessages = this._handleRecentMessages.bind(this) 
    this._handleClosedEvent = this._handleClosedEvent.bind(this)  
>>>>>>> working on create dm room
  }

  componentDidMount() {
    this._handleLogIn();
    this._handleRecentMessages();
    this._handleRefreshMessages();
  }

  componentWillUnmount() {
    socket.removeAllListeners();
    this._handleLogOut();
  }

  handleInputChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  handleSendClick(event) {
    event.preventDefault();
    socket.emit('newmessage', {
      event_id: this.props.event.id,
      user_name: this.props.user_name,
      text: this.state.text
    });
    this.setState({
      text: ''
    });
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      socket.emit('newmessage', {
        event_id: this.props.event.id,
        user_name: this.props.user_name,
        text: this.state.text
      });
      this.setState({
        text: ''
      });
    }
  }

<<<<<<< HEAD
=======
  handleCloseClick(event) {
    event.preventDefault()
    socket.emit('closeevent', { event_id: this.props.event.id });
    axios.put('/api/event/close', { event_id: this.props.event.id })
      .then(() => {
        this.setState({
          closed: true
        })
      })
  }
  
  handleDMClick(user) {
    this.props.createDMRoom(this.props.user_id, user);
  }
  
>>>>>>> working on create dm room
  _handleLogIn() {
    socket.connect();
    socket.emit('enterevent', {
      event_id: this.props.event.id,
      user_name: this.props.user_name
    });
    console.log(this.props.messages);
  }

  _handleLogOut() {
    socket.emit('leaveevent', {
      user_name: this.props.user_name,
      event_id: this.props.event_id
    });
  }

  _handleRecentMessages() {
    socket.on('recentmessages', recentMessages => {
      this.props.recentEventMessages(recentMessages);
    });
  }

  _handleRefreshMessages() {
    socket.on('refreshmessages', newMessage => {
      this.props.newEventMessage(newMessage);
    });
  }

  _handleClosedEvent() {
    socket.on('eventclosed', () => {
      this.setState({
        closed: true
      })
    })
  }

  render() {
    let closeEvent;
    
    if (this.props.user_id === this.props.event.userId) {
      closeEvent =  <button type="button"
                            onClick={this.handleCloseClick}
                    >Close Event</button>
    } else {
      closeEvent = '';
    }

    if (this.state.closed === true) {
      return (
        <Redirect to='/open_events' />
      )
    }

    if (this.props.messages.length === 0) {
      return (
        <div>
          <input
            type="text"
            value={this.state.text}
            onKeyPress={this.handleKeyPress}
            onChange={this.handleInputChange}
          />
          <button type="button" onClick={this.handleSendClick}>
            {' '}Send{' '}
          </button>
        </div>
      );
    }

    if (!this.props.user_name) {
      return <div>You need to log in</div>;
    }

    return (
<<<<<<< HEAD
      <div>
        <ChatLog roomMessages={this.props.messages} />
        <input
          type="text"
=======
      <div>   
        {closeEvent}
        <ChatLog 
          roomMessages={this.props.messages}
          dmClick={this.handleDMClick}
        />
        <input  
          type="text" 
>>>>>>> working on create dm room
          onChange={this.handleInputChange}
          value={this.state.text}
          onKeyPress={this.handleKeyPress}
        />
        <button type="button" onClick={this.handleSendClick}>
          {' '}Send{' '}
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    event_id: state.eventId.eventId,
    user_name: state.profile.name,
    user_id: state.profile.id,
    messages: state.event_messages,
    in_event: state.in_event
  };
}

function mapDispatchToProps(dispatch) {
<<<<<<< HEAD
  return bindActionCreators(
    {
      recentEventMessages: recentEventMessages,
      newEventMessage: newEventMessage,
      enterEvent: enterEvent,
      leaveEvent: leaveEvent
    },
    dispatch
  );
=======
  return bindActionCreators({
    recentEventMessages: recentEventMessages,
    newEventMessage: newEventMessage,
    createDMRoom: createDMRoom
  }, dispatch)
>>>>>>> working on create dm room
}

export default connect(mapStateToProps, mapDispatchToProps)(EventChat);
