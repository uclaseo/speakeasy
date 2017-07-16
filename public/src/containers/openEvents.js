import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchOpenEvents } from './../actions/openEventsActions'
import OpenEventDetail from './../components/openEventDetail'
import { setActiveEvent } from './../actions/activeEventAction'
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
    this.props.setActiveEvent(event, this.props.user_id);
  }

  render() {
    let events = this.props.open_events.map((event) => {
      return (
        <OpenEventDetail event={event} key={event.id} eventClick={this.handleEventClick}/>
      )
    })

    return (
      <div>
        <ul>
          {events}
        </ul>       
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    open_events: state.open_events,
    user_id: state.profile.id
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchOpenEvents: fetchOpenEvents,
    setActiveEvent: setActiveEvent,
    clearEventMessages: clearEventMessages
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenEventsList)