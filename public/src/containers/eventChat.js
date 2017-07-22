import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import io from 'socket.io-client'
import ChatDetail from '../components/chatDetail'
import ChatLog from '../components/chatLog'
import { Image, Glyphicon, InputGroup, PageHeader, Col, Button, FormGroup, FormControl } from 'react-bootstrap'
import { recentEventMessages, newEventMessage } from '../actions/eventMessagesActions'
import { createDMRoom } from '../actions/dmRoomsActions'
import { setIsVisited } from '../actions/index.js'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

const socket = io();

class EventChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      closed: false,
      dm: false,
      files: [],
      imagePreviewUrls: [],
      passwordInput: '',
      showPasswordInput: true,
      showChat: !!!this.props.event.password,
      redirectHome: false,
    };

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

    this.handleUpload = this.handleUpload.bind(this);
    this.renderImagePreview = this.renderImagePreview.bind(this);
    this.registerImageUrl = this.registerImageUrl.bind(this);

    this.submitPasswordForm = this.submitPasswordForm.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.redirectHome = this.redirectHome.bind(this);
    this.setShowForm = this.setShowForm.bind(this);
  }



  componentDidMount() {
    this._handleLogIn();
    this._handleRecentMessages();
    this._handleRefreshMessages();
    this.setShowForm();
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

  setShowForm() {
    //if event has password show form
    if (!!this.props.event.password) {
      console.log('set show form !!this.props.event.password\n\n')
      this.setState({ showPasswordInput: true })
    }
    //if user is the event creator 
    if (this.props.event.userId == this.props.user_id) {
      console.log('setshow form comparing active event \n\n', this.props)
      this.setState({ showChat: true, showPasswordInput: false })
    }
  }

  handleSendClick(event) {
    event.preventDefault();
    if (this.state.files.length !== 0) {
      const images = {};
      const imageLink = {};
      const text = this.state.text;
      this.state.files.map((file, index) => {
        images[index] = Math.floor(Math.random() * 100000) + file.name,
          imageLink[index] = `https://s3-us-west-1.amazonaws.com/hrlaspeakeasy/${images[index]}`
      });
      console.log('images', images);
      axios.post('/api/event/image/upload/geturl', images)
        .then((response) => {
          console.log('1');
          response.data.map((eachFile, index) => {
            this.registerImageUrl(eachFile)
            axios.put(eachFile.url, this.state.files[index])
              .then(() => {
                socket.emit('newmessage', {
                  event_id: this.props.event.id,
                  user_name: this.props.user_name,
                  user_id: this.props.user_id,
                  text: text
                }, imageLink)
              })
          })
        })
        .then(() => {
          this.setState({
            text: '',
            files: [],
            imagePreviewUrls: []
          })
        })
    } else {
      socket.emit('newmessage', {
        event_id: this.props.event.id,
        user_name: this.props.user_name,
        user_id: this.props.user_id,
        text: this.state.text
      });
      this.setState({
        text: ''
      });
    };
  }

  registerImageUrl(eachFile) {
    const imageData = {
      name: eachFile.fileName,
      imageLink: `https://s3-us-west-1.amazonaws.com/hrlaspeakeasy/${eachFile.fileName}`,
      userId: this.props.user_id,
      eventId: this.props.event.id
    };
    axios.post('/api/event/image/upload', imageData)
      .then((response) => {
      })
      .catch((error) => {
        console.log('error', error);
      })
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      if (this.state.files.length !== 0) {
        const images = {};
        const imageLink = {};
        const text = this.state.text;
        this.state.files.map((file, index) => {
          images[index] = Math.floor(Math.random() * 100000) + file.name,
            imageLink[index] = `https://s3-us-west-1.amazonaws.com/hrlaspeakeasy/${images[index]}`
        });
        console.log('images', images);
        axios.post('/api/event/image/upload/geturl', images)
          .then((response) => {
            console.log('1');
            response.data.map((eachFile, index) => {
              this.registerImageUrl(eachFile)
              axios.put(eachFile.url, this.state.files[index])
                .then(() => {
                  socket.emit('newmessage', {
                    event_id: this.props.event.id,
                    user_name: this.props.user_name,
                    user_id: this.props.user_id,
                    text: text
                  }, imageLink)
                })
            })
          })
          .then(() => {
            this.setState({
              text: '',
              files: [],
              imagePreviewUrls: []
            })
          })
      } else {
        socket.emit('newmessage', {
          event_id: this.props.event.id,
          user_name: this.props.user_name,
          user_id: this.props.user_id,
          text: this.state.text
        });
        this.setState({
          text: ''
        });
      };
    }
  }

  handleCloseClick(event) {
    event.preventDefault()
    socket.emit('closeevent', { event_id: this.props.event.id });
    axios.put('/api/crosspath/', { eventId: this.props.event.id })
      .then(() => {
        axios.put('/api/event/close', { event_id: this.props.event.id })
          .then(() => {
            this.setState({
              closed: true
            })
          })
      })
  }

  handleDMClick(message) {
    if (this.props.user_id !== message.user_id) {
      axios.post('/api/dmrooms/create', {
        userId: this.props.user_id,
        anotherId: message.user_id
      })
        .then((response) => {
          let dm_id = response.data.room.id;
          console.log('dm click response: ', dm_id)
          this.props.createDMRoom(message.user_name, dm_id)
          this.setState({ dm: true })
        })
    } else {
      return;
    }
  }

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

  handleUpload(event) {
    event.preventDefault();
    const files = event.target.files;
    console.log('files uploaded', files);
    const stateFiles = this.state.files;
    const stateImagePreviewUrls = this.state.imagePreviewUrls;

    for (let i = 0, file; file = files[i]; i++) {
      console.log('hello', i)
      let reader = new FileReader();
      reader.onloadend = () => {
        stateFiles.push(file);
        stateImagePreviewUrls.push(reader.result);
        this.setState({
          files: stateFiles,
          imagePreviewUrls: stateImagePreviewUrls
        });
        console.log(this.state);
      };
      reader.readAsDataURL(file);
    }
  }

  renderImagePreview() {
    const imagePreviewUrls = this.state.imagePreviewUrls
    return (
      <div>
        HAHAHAHAHAA PREVIEW
        {imagePreviewUrls.map((eachUrl) => {
          return <img key={Math.random()} className="thumb" src={eachUrl} />
        })}
      </div>
    )
  }

  submitPasswordForm(event) {
    event.preventDefault();
    if (this.state.passwordInput == this.props.event.password) {
      this.setState({ showChat: true, showPasswordInput: false })
      // this.props.isVisited(this.props.event.id, true)
    } else {
      alert("wrong password")
    }
  }

  handlePasswordChange(event) {
    console.log("handlePasswordChange", event);
    this.setState({
      passwordInput: event.target.value
    })
  }

  redirectHome() {
    console.log("in redirectHome");
    this.setState({ redirectHome: true })
  }

  render() {

    let closeEvent;
    if (this.props.user_id === this.props.event.userId) {
      closeEvent = <button type="button"
        onClick={this.handleCloseClick}
      >Close Event</button>
    } else {
      closeEvent = null;
    }

    if (this.state.closed === true) {
      return (
        <Redirect to='/open_events' />
      )
    }

    if (this.state.dm === true) {
      return (
        <Redirect to='/dm_chat' />
      )
    }

    if (this.props.messages.length === 0) {
      return (
        <div>
          {closeEvent}
          <input
            type="text"
            value={this.state.text}
            onKeyPress={this.handleKeyPress}
            onChange={this.handleInputChange}
          />
          <button type="button" onClick={this.handleSendClick}>
            Send
          </button>
        </div>
      );
    }

    if (!this.props.user_name) {
      return <div>You need to log in</div>;
    }

    if (this.state.redirectHome) {
      return (
        <Redirect to='/home' />
      )
    }

    return (
      <div>

        {console.log("password should be", this.props.event.password, "userId is", this.props.event, "creator is ", this.props.user_id)}
        {console.log('this is the state of showpasswordinput ', this.state.showPasswordInput)}
        {(this.state.showPasswordInput) ?
          <div>
            Please EnterPassword:
            <form onSubmit={this.submitPasswordForm}>
              <input type="text"
                name="eventpassword"
                value={this.state.passwordInput}
                onChange={this.handlePasswordChange}
              />
              <br></br>
              <input type="submit" value="Submit" />
              <input type="button" value="Return to Home" onClick={this.redirectHome} />
            </form>
          </div>
          : null}


        {this.state.showChat ?
          <div>
            {closeEvent}
            <ChatLog
              roomMessages={this.props.messages}
              dmClick={this.handleDMClick}
            />
            <input
              type="text"
              onChange={this.handleInputChange}
              value={this.state.text}
              onKeyPress={this.handleKeyPress}
            />
            <button type="button" onClick={this.handleSendClick}>
              Send
          </button>
            <input type="file" id="fileinput" multiple="multiple" accept="image/*"
              onChange={(event) => this.handleUpload(event)} />
            {this.renderImagePreview()}
          </div>
          : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    event: state.active_event,
    user_name: state.profile.name,
    user_id: state.profile.id,
    messages: state.event_messages,
    isVisited: state.isVisited
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    recentEventMessages: recentEventMessages,
    newEventMessage: newEventMessage,
    createDMRoom: createDMRoom,
    isVisited: setIsVisited
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EventChat);
