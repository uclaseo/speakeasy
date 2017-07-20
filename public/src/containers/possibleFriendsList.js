import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { fetchPossibleFriends, clearPossibleFriends } from './../actions/possibleFriendsActions'
import PossibleFriendDetail from './../components/possibleFriendDetail'
import { setActiveDMRoom, createDMRoom } from './../actions/dmRoomsActions'


class PossibleFriendsList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dm: false
    }

    this.handleFriendClick = this.handleFriendClick.bind(this)
  }

  componentDidMount() {
    this.props.clearPossibleFriends()
    this.props.fetchPossibleFriends(this.props.user_id)
  }

  handleFriendClick(friend) {
    axios.post('/api/dmrooms/create', {
        userId: this.props.user_id,
        anotherId: friend.user_to_id
      })
        .then((response) => {
          let dm_id = response.data.room.id;
          console.log('friend click response: ', dm_id)
          this.props.createDMRoom(friend.user_to_name, dm_id)
          this.setState({ dm: true })
        })
  } 


  render() {
    let friends = this.props.possibleFriends.map((friend) => {
      return (
        <PossibleFriendDetail 
          friend={friend} 
          key={friend.user_to_id} 
          handleFriendClick={this.handleFriendClick}
        />
      )
    })

    return (
      <div>
        <ul>
          {friends}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user_id: state.profile.id,
    possibleFriends: state.possibleFriends
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchPossibleFriends: fetchPossibleFriends,
    setActiveDMRoom: setActiveDMRoom,
    clearPossibleFriends: clearPossibleFriends,
    createDMRoom: createDMRoom
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PossibleFriendsList)