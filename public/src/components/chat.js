import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as chatActions from '../actions/chatActions'
import { bindActionCreators } from 'redux'
import io from 'socket.io-client'
import ChatDetail from './chatDetail'
import { Image, Glyphicon, InputGroup, PageHeader, Col, Button, FormGroup, FormControl } from 'react-bootstrap'


const socket = io();

class Chat extends Component {
  constructor() {
    super()
    this.state = {
      user_name: '',
      event_id: 2,
      text: '',
      messages: [],
      name_chosen: false
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmitClick = this.handleSubmitClick.bind(this)
    this.handleUsernameClick = this.handleUsernameClick.bind(this)
    this._handleRecentMessages = this._handleRecentMessages.bind(this)   
  }


  componentDidMount() {
    this._handleRecentMessages()
  }

  handleInputChange(e) {
    let input = {}
    input[e.target.name] = e.target.value
    this.setState(() => {
      return input
    })
    console.log(this.state);
  }

  handleSubmitClick(e) {
    e.preventDefault()
    socket.emit('newmessage', {
      event_id: this.state.event_id,
      user_name: this.state.user_name,
      text: this.state.text
    })
    this.setState({ text: '' })
  }

  handleUsernameClick(e) {
    e.preventDefault()
    socket.emit('enterevent', {
      user_name: this.state.user_name,
      event_id: this.state.event_id
    })
    this.setState({ name_chosen: true })
  }

  _handleRecentMessages() {
    socket.on('recentmessages', (recentMessages) => {
      this.setState({
        messages: [ ...state, recentMessages ]
      })
    })
  }



  render() {
    return (
      <div>
        <div>
          Chat
        </div>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return { eventRoom: state.activeRoom, user_name: state.user_name }
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//     createMessage: chatActions.saveMessage
//   }, dispatch)
// }

export default Chat;

// export default connect(mapStateToProps, mapDispatchToProps)(Chat);