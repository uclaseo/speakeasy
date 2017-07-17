import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DMRoomDetail from './../components/dmRoomDetail'
import { fetchDMRooms, setActiveDMRoom } from './../actions/dmRoomsActions'



class DirectMessageList extends Component {
  constructor(props) {
    super(props)

    this.handleRoomClick = this.handleRoomClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchDMRooms(this.props.user_id)
  }

  handleRoomClick(room) {
    this.props.setActiveDMRoom(room)
  }

  render() {
    let rooms = this.props.dmRooms.map((room) => {
      console.log('this is the room object ', room.another.name);
      return (
        <DMRoomDetail room={room} 
                      key={room.id} 
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
    setActiveDMRoom: setActiveDMRoom
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(DirectMessageList);