import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import io from 'socket.io-client'
import DMLog from '../components/dmLog'
import { Image, Glyphicon, InputGroup, PageHeader, Col, Button, FormGroup, FormControl } from 'react-bootstrap'
import { recentDirectMessages, newDirectMessages } from '../actions/eventMessagesActions'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

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
    this.handleCloseClick = this.handleCloseClick.bind(this)
    this._handleLogIn = this._handleLogIn.bind(this)
    this._handleLogOut = this._handleLogOut.bind(this)
    this._handleRefreshMessages = this._handleRefreshMessages.bind(this)
    this._handleRecentMessages = this._handleRecentMessages.bind(this) 
    // this._handleClosedEvent = this._handleClosedEvent.bind(this)  
  }

  componentDidMount() {
    this._handleLogIn()
    this._handleRecentMessages()
    this._handleRefreshMessages()
    this._handleClosedEvent()
  }

  componentWillUnmount() {
    socket.removeAllListeners()
    this._handleLogOut()
  }

  handleInputChange(e) {
    this.setState({
      text: e.target.value
    })
  }

  handleSendClick(event) {
    event.preventDefault()
    socket.emit('newdm', {
      dm_id: this.props.event.id,
      user_name: this.props.user_name,
      text: this.state.text
    })
    this.setState({
      text: ''
    })
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      socket.emit('newdm', {
        dm_id: this.props.event.id,
        user_name: this.props.user_name,
        text: this.state.text
      })
      this.setState({
        text: ''
      })
    }
  }

  // handleCloseClick(event) {
  //   event.preventDefault()
  //   socket.emit('closeevent', { event_id: this.props.event.id });
  //   axios.put('/api/event/close', { event_id: this.props.event.id })
  //     .then(() => {
  //       this.setState({
  //         closed: true
  //       })
  //     })
  // }
  
  _handleLogIn() {
    socket.connect();
    socket.emit('enterdm', {
      event_id: this.props.event.id,
      user_name: this.props.user_name
    })
    console.log(this.props.messages)
  }

  _handleLogOut() {
    socket.emit('leaveevent', {
      user_name: this.props.user_name,
      event_id: this.props.event.id
    })
  }

  _handleRecentMessages() {
    socket.on('recentdms', (recentMessages) => {
      this.props.recentDirectMessages(recentMessages)
    })
  }

  _handleRefreshMessages() {
    socket.on('refreshdms', (newMessage) => {
      this.props.newDirectMessages(newMessage)
    })
  }

  // _handleClosedEvent() {
  //   socket.on('eventclosed', () => {
  //     this.setState({
  //       closed: true
  //     })
  //   })
  // }

  render() {
    // let closeEvent;
    
    // if (this.props.user_id === this.props.event.userId) {
    //   closeEvent =  <button type="button"
    //                         onClick={this.handleCloseClick}
    //                 >Close Event</button>
    // } else {
    //   closeEvent = '';
    // }

    // if (this.state.closed === true) {
    //   return (
    //     <Redirect to='/open_events' />
    //   )
    // }

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
        {closeEvent}
        <DMLog directMessages={this.props.dmMessages}/>
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
    dmRoom: state.activeDMRoom, 
    user_name: state.profile.name,
    user_id: state.profile.id,
    dmMessages: state.dmMessages,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    recentDirectMessages: recentDirectMessages,
    newDirectMessages: newDirectMessages
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EventChat)