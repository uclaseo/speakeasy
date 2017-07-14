// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import * as chatActions from '../actions/chatActions'
// import { bindActionCreators } from 'redux'
// import io from 'socket.io-client'
// import ChatDetail from './chatDetail'
// import ChatLog from './chatLog'
// import { Image, Glyphicon, InputGroup, PageHeader, Col, Button, FormGroup, FormControl } from 'react-bootstrap'


// const socket = io();

// class Chat extends Component {
//   constructor() {
//     super()
//     this.state = {
//       user_name: '',
//       event_id: null,
//       text: '',
//       messages: [],
//       name_chosen: false
//     }
//     this.handleInputChange = this.handleInputChange.bind(this)
//     this.handleSubmitClick = this.handleSubmitClick.bind(this)
//     this.handleSendClick = this.handleSendClick.bind(this)
//     this.handleUsernameClick = this.handleUsernameClick.bind(this)
//     this.handleKeyPress = this.handleKeyPress.bind(this)
//     this._handleLogIn = this._handleLogIn.bind(this)
//     this._handleRefreshMessages = this._handleRefreshMessages.bind(this)
//     this._handleRecentMessages = this._handleRecentMessages.bind(this)   
//   }


//   componentDidMount() {
//     this._handleRecentMessages()
//     this._handleRefreshMessages()
//   }

//   handleInputChange(e) {
//     let input = {}
//     input[e.target.name] = e.target.value
//     this.setState(() => {
//       return input
//     })
//   }

//   handleSendClick(event) {
//     event.preventDefault()
//     socket.emit('newmessage', {
//       event_id: this.state.event_id,
//       user_name: this.state.user_name,
//       text: this.state.text
//     })
//     this.setState({
//       text: ''
//     })
   
//   }

//   handleSubmitClick(event) {
//     event.preventDefault()
//     this.setState({
//       name_chosen: true
//     })
//     console.log('submit user name and event id ', this.state)
//     this._handleLogIn()
//   }

//   handleUsernameClick(e) {
//     e.preventDefault()
//     socket.emit('enterevent', {
//       user_name: this.state.user_name,
//       event_id: this.state.event_id
//     })
//     this.setState({ name_chosen: true })
//   }

//   handleKeyPress(event) {
//     if (event.key === 'Enter') {
//       socket.emit('newmessage', {
//         event_id: this.state.event_id,
//         user_name: this.state.user_name,
//         text: this.state.text
//       })
//       this.setState({
//         text: ''
//       })
//     }
//   }
  
//   _handleLogIn() {
//     socket.emit('enterevent', {
//       event_id: this.state.event_id,
//       user_name: this.state.user_name
//     })
//   }

//   _handleRecentMessages() {
//     socket.on('recentmessages', (recentMessages) => {
//       console.log('these are the recent messages ', recentMessages);
//       let oldMessages = this.state.messages;
//       let newMessages = oldMessages.concat(recentMessages.reverse());
//       console.log('these are the new messages: ', newMessages);
//       this.setState({
//         messages: newMessages
//       })
//     })
//   }

//   _handleRefreshMessages() {
//     socket.on('refreshmessages', (newMessage) => {
//       console.log('refresh messages caught ', newMessage);
//       let refresh = this.state.messages;
//       refresh.push(newMessage);
//       console.log('refresh new messages ', refresh);
//       this.setState({
//         messages: refresh
//       })
//     })
//   }



//   render() {
//     let UserEvent;
//     if (this.state.name_chosen === false) {
//       UserEvent = 
//         <div>
//           <input  type="text" 
//                   onChange={this.handleInputChange} 
//                   placeholder="Pick a user name"
//                   name="user_name"
//           />
//           <input  type="text" 
//                   onChange={this.handleInputChange} 
//                   placeholder="Pick an event id (integer)"
//                   name="event_id"
//           />
//           <Button bsStyle="primary" type="button" onClick={this.handleSubmitClick}>Submit</Button>
//         </div>
       
//     } else {
//       UserEvent = '';
//     }
//     return (
//       <div>   
//         <ChatLog roomMessages={this.state.messages}/>
//         <input  type="text" 
//                 value={this.state.text} 
//                 onChange={this.handleInputChange} 
//                 name="text"
//                 onKeyPress={this.handleKeyPress}
//         />             
//         <Button bsStyle="primary" 
//                 type="button" 
//                 onClick={this.handleSendClick}
//         > Send </Button>        
//         {UserEvent}   
//       </div>
//     );
//   }
// }

// // function mapStateToProps(state) {
// //   return { eventRoom: state.activeRoom, user_name: state.user_name }
// // }

// // function mapDispatchToProps(dispatch) {
// //   return bindActionCreators({
// //     createMessage: chatActions.saveMessage
// //   }, dispatch)
// // }

// export default Chat;

// // export default connect(mapStateToProps, mapDispatchToProps)(Chat);