import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchOpenEvents } from './../actions/openEventsActions'
import OpenEventDetail from './../components/openEventDetail'
import { setActiveEventId } from './../actions/index'
import { clearEventMessages } from './../actions/eventMessagesActions'
import { Link } from 'react-router-dom'


class OpenEventsList extends Component {
  constructor(props) {
    super(props)

    this.handleEventClick = this.handleEventClick.bind(this);
  }

  componentDidMount() {
    this.props.clearEventMessages()
    this.props.fetchOpenEvents()
  }

  handleEventClick(event) {
    
    this.props.setActiveEventId(event.id);
  }

  render() {
    let events = this.props.open_events.map((event) => {
      return (
<<<<<<< HEAD
        <OpenEventDetail event={event} key={event.id} eventClick={this.handleEventClick}/>
=======
        <OpenEventDetail event={event} eventClick={this.handleEventClick}/>
>>>>>>> add clear event messages
      )
    })

    return (
      <div>
        <ul>
          {events}
        </ul>
        <button type="button" onClick={this.props.clearEventMessages}>fuck</button>
       
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    open_events: state.open_events
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchOpenEvents: fetchOpenEvents,
    setActiveEventId: setActiveEventId,
    clearEventMessages: clearEventMessages
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenEventsList)