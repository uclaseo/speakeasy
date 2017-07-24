import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Col, Grid, Row } from 'react-bootstrap';

import DMRoomDetail from './../components/dmRoomDetail'
import { fetchDMRooms, setActiveDMRoom } from './../actions/dmRoomsActions'
import { clearDirectMessages } from './../actions/directMessagesActions'
import Header from '../components/header'

class DirectMessageList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dm: false
    }

    this.handleRoomClick = this.handleRoomClick.bind(this)
  }

  componentDidMount() {
    this.props.clearDirectMessages()
    this.props.fetchDMRooms(this.props.user_id)
  }

  handleRoomClick(room) {
    this.props.setActiveDMRoom(room)
    this.setState({ dm: true })
  }


  renderRoomDetail() {
    let rooms = this.props.dmRooms.map(room => {
      return (
        <div key={room.dm_id} className="text-left">
          <DMRoomDetail
            room={room}
            handleRoomClick={this.handleRoomClick}
          />
        </div>
      )
    }
    )
    return rooms;
  }

  render() {
    if (this.state.dm === true) {
      return (<Redirect to="/dm_chat" />)
    }

    return (
      <div>

        <Header />

        <section>
          <div className="container content-section">
            <div className="row">
              <div className="container text-center row col-md-8 col-md-offset-2">
                <h2>You have direct messages with...</h2>
                {this.renderRoomDetail()}
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