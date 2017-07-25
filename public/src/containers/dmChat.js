import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import io from 'socket.io-client'
import DMLog from '../components/dmLog'
import { Image, Glyphicon, InputGroup, PageHeader, Col, Grid, Row, Button, FormGroup, FormControl } from 'react-bootstrap'
import { recentDirectMessages, newDirectMessage } from '../actions/directMessagesActions'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/header'




const socket = io();

class DMChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSendClick = this.handleSendClick.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this._handleLogIn = this._handleLogIn.bind(this)
    this._handleLogOut = this._handleLogOut.bind(this)
    this._handleRefreshMessages = this._handleRefreshMessages.bind(this)
    this._handleRecentMessages = this._handleRecentMessages.bind(this)
    this.scrollToBottom = this.scrollToBottom.bind(this)
  }

  componentDidMount() {
    console.log('this.props dmChat :::', this.props);
    this._handleLogIn()
    this._handleRecentMessages()
    this._handleRefreshMessages()
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  componentWillUnmount() {
    socket.removeAllListeners()
    this._handleLogOut()
  }

  scrollToBottom() {
    // this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
  }

  handleInputChange(e) {
    this.setState({
      text: e.target.value
    })
  }

  handleSendClick(event) {
    event.preventDefault()
    socket.emit('newdm', {
      dm_id: this.props.dmRoom.dm_id,
      user_from_name: this.props.user_from_name,
      user_to_name: this.props.user_to_name,
      text: this.state.text
    })
    this.setState({
      text: ''
    })
    console.log("this.state.text::", this.state.text);
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      socket.emit('newdm', {
        dm_id: this.props.dmRoom.dm_id,
        user_from_name: this.props.user_from_name,
        user_to_name: this.props.user_to_name,
        text: this.state.text
      })
      this.setState({
        text: ''
      })
    }
  }

  _handleLogIn() {
    socket.connect();
    socket.emit('enterdm', {
      dm_id: this.props.dmRoom.dm_id,
      user_name: this.props.user_name
    })
    console.log(this.props.messages)
  }

  _handleLogOut() {
    socket.emit('leaveevent', {
      user_name: this.props.user_from_name,
      dm_id: this.props.dmRoom.dm_id
    })
  }

  _handleRecentMessages() {
    socket.on('recentdms', (recentMessages) => {
      this.props.recentDirectMessages(recentMessages)
    })
  }

  _handleRefreshMessages() {
    socket.on('refreshdms', (newMessage) => {
      this.props.newDirectMessage(newMessage)
    })
  }

  renderSendButton() {
    let send =
      <button
        className="btnghost"
        onClick={this.handleSendClick}>
        <i className="fa"></i>
        Send
      </button>
    return send;
  }

  render() {

    return (
      <div>
        <Header />
 
      <section id="contact">
        <DMLog
          directMessages={this.props.dmMessages}
        />

            <div class="container content-section">
              <div class="row">
                <div class="col-lg-8 col-lg-offset-2">
                  <form
                      id="contactform" className="msg-input text-center">
                      <input
                        placeholder="Your message here *"
                        type="text"
                        onChange={this.handleInputChange}
                        value={this.state.text}
                      />

                      <div className="">
                        <ul>
                          <Grid>
                            <Col>
                              {this.renderSendButton()}
                            </Col>
                          </Grid>
                        </ul>
                    </div>

                  </form>
                </div>
              </div>
            </div>

      </section>

                <div ref={(el) => this.messagesEnd = el} />
        

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
          dmRoom: state.activeDMRoom,
    user_from_name: state.profile.name,
    user_to_name: state.activeDMRoom.user_to_name,
    user_id: state.profile.id,
    dmMessages: state.dm_messages
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
          recentDirectMessages: recentDirectMessages,
    newDirectMessage: newDirectMessage
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DMChat)