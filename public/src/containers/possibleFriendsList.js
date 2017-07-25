import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { fetchPossibleFriends, clearPossibleFriends } from './../actions/possibleFriendsActions'
import PossibleFriendDetail from './../components/possibleFriendDetail'
import { setActiveDMRoom, createDMRoom } from './../actions/dmRoomsActions'
import { clearDirectMessages } from './../actions/directMessagesActions'
import Header from '../components/header'


class PossibleFriendsList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dm: false
    }

    this.handleFriendClick = this.handleFriendClick.bind(this)
  }

  componentDidMount() {
    this.props.clearDirectMessages()
    this.props.clearPossibleFriends()
    this.props.fetchPossibleFriends(this.props.user_id, this.props.dmRooms)
  }

  handleFriendClick(friend) {
    let user_to_id = friend.user_to_id
    axios.post('/api/dmrooms/create', {
        userId: this.props.user_id,
        anotherId: friend.user_to_id
      })
        .then((response) => {
          let dm_id = response.data.room.id;
          console.log('friend click response: ', dm_id)
          this.props.createDMRoom(friend.user_to_name, dm_id)
        })
        .then(() => {
          axios.put('/api/friend/chat', { cpId: friend.id })
        })
        .then(() => {
          this.setState({ dm: true })
        })
        
  } 

  renderFriends() {
    let friends = this.props.possibleFriends.map(friend => {
      return (
        <div key={friend.user_to_id}  className="text-left">
          <PossibleFriendDetail 
            friend={friend} 
            key={friend.user_to_id} 
            handleFriendClick={this.handleFriendClick}
          />
        </div>
      )
    })
    return friends;
  }

  renderMessage() {
    let msg;

    if (this.props.possibleFriends.length) {
      msg = "YOUR FRIENDS"
    } else {
      msg = "YOU HAVE NO POSSIBLE FRIENDS"
    }

    return (
      <div className="">
        <h2>{msg}</h2>
      </div>
    );
  }

  render() {
    console.log('this.props from possible friends:', this.props);

    if (this.state.dm === true) {
      return (
        <Redirect to='/dm_chat' />
      )
    }

    let listStyle = {margin: "0 0 0 150px"}

    return (
      <div>

        <Header />

        <section>
          <div className="container content-section">
            <div className="row">
              <div className="container text-center row col-md-8 col-md-offset-2">
                  {this.renderMessage()}
                  <p style={listStyle}>{this.renderFriends()}</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user_id: state.profile.id,
    possibleFriends: state.possibleFriends,
    dmRooms: state.dmRooms
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchPossibleFriends: fetchPossibleFriends,
    setActiveDMRoom: setActiveDMRoom,
    clearPossibleFriends: clearPossibleFriends,
    createDMRoom: createDMRoom,
    clearDirectMessages: clearDirectMessages
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PossibleFriendsList)