import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DMRoomDetail from './../components/dmRoomDetail'
import { fetchDMRooms, setActiveDMRoom } from './../actions/dmRoomsActions'
import { clearDirectMessages } from './../actions/directMessagesActions'


class DirectMessageList extends Component {
  constructor(props) {
    super(props)

    this.handleRoomClick = this.handleRoomClick.bind(this)
  }

  componentDidMount() {
    this.props.clearDirectMessages()
    this.props.fetchDMRooms(this.props.user_id)
  }

  handleRoomClick(room) {
    this.props.setActiveDMRoom(room)
  }

  render() {
    let rooms = this.props.dmRooms.map((room) => {
      return (
        <DMRoomDetail room={room} 
                      key={room.dm_id} 
                      handleRoomClick={this.handleRoomClick}
        />
      )
    })

    return (
      <div>
        <ul>
          {rooms}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dmRooms: state.dmRooms,
    user_id: state.profile.id
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchDMRooms: fetchDMRooms,
    setActiveDMRoom: setActiveDMRoom,
    clearDirectMessages: clearDirectMessages
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(DirectMessageList);