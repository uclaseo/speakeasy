import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as chatActions from '../actions/chatActions'
import { bindActionCreators } from 'redux'
import io from 'socket.io-client'
import ChatDetail from './chatDetail'
import ChatLog from './chatLog'
import { Image, Glyphicon, InputGroup, PageHeader, Col, Button, FormGroup, FormControl } from 'react-bootstrap'


const socket = io();

class Chat extends Component {
  constructor() {
    super()
    this.state = {
      user_name: 'steve',
      event_id: 2,
      text: '',
      messages: [{user_name: "steve", text: "whatever", event_id: 2}],
      name_chosen: false
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmitClick = this.handleSubmitClick.bind(this)
    this.handleUsernameClick = this.handleUsernameClick.bind(this)
    this._handleLogIn = this._handleLogIn.bind(this)
    this._handleRefreshMessages = this._handleRefreshMessages.bind(this)
    this._handleRecentMessages = this._handleRecentMessages.bind(this)   
  }


  componentDidMount() {
    this._handleRecentMessages()
    this._handleRefreshMessages()
  }

  handleInputChange(e) {
    let input = {}
    input[e.target.name] = e.target.value
    this.setState(() => {
      return input
    })
    console.log(this.state);
  }

  handleSubmitClick() {
    // ev.preventDefault()
    console.log('submit message click ')
    socket.emit('newmessage', {
      event_id: this.state.event_id,
      user_name: this.state.user_name,
      text: this.state.text
    })
  }

  handleUsernameClick(e) {
    e.preventDefault()
    socket.emit('enterevent', {
      user_name: this.state.user_name,
      event_id: this.state.event_id
    })
    this.setState({ name_chosen: true })
  }
  
  _handleLogIn() {
    socket.emit('enterevent', {
      event_id: this.state.event_id,
      user_name: this.state.user_name
    })
  }

  _handleRecentMessages() {
    socket.on('recentmessages', (recentMessages) => {
      console.log('these are the recent messages ', recentMessages);
      let oldMessages = this.state.messages;
      let newMessages = oldMessages.concat(recentMessages);
      console.log('these are the new messages: ', newMessages);
      this.setState({
        messages: newMessages
      })
    })
  }

  _handleRefreshMessages() {
    socket.on('refreshmessages', (newMessage) => {
      console.log('refresh messages caught ', newMessage);
      let refresh = this.state.messages;
      refresh.push(newMessage);
      console.log('refresh new messages ', refresh);
      this.setState({
        messages: refresh
      })
    })
  }



  render() {
    console.log(this.state);
    return (
      <div>
      
        <ChatLog roomMessages={this.state.messages}/>
        <form>
          <FormGroup>
            <InputGroup>
            <FormControl onChange={this.handleInputChange} name="text"/>
            <InputGroup.Button> 
              <Button bsStyle="primary" type="button" onClick={() => this.handleSubmitClick()}> Send </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
        </form>
        <Button bsStyle="primary" type="button" onClick={() => this._handleLogIn()}>Log In</Button>
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