import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import Header from '../components/header';
import Portfolio from '../components/portfolio';


import { setActivePreviousEvent, clearActivePreviousEvent } from '../actions/activePreviousEvent'

class User_Events extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userEvents: [],
      photos: []
    }
    this.handlePreviousEventPhotos = this.handlePreviousEventPhotos.bind(this);
    this.renderEvents = this.renderEvents.bind(this);

  }

  componentWillMount() {

    axios.get(`/api/event/fetchuserevents/${this.props.profile.id}`)
      .then((response) => {
        this.setState({
          userEvents: response.data,
        })
      })
      .catch((error) => {
        console.log("not getting user1's event", error);
      })

  }
  componentDidMount() {
    this.props.clearActivePreviousEvent();
  }

  renderEventMessage() {
    let msg;

    if (this.state.userEvents.length) {
      msg = 'PREVIOUS EVENTS';
    } else {
      msg = 'You haven\'t been to any events yet!';
    }

    return (
      <div className="col-lg-8 col-lg-offset-2 container content-section text-center">
        <h2>{msg}</h2>
      </div>
    );
  }

  renderEvents() {
    console.log("this.state.userEvents:::", this.state.userEvents);
    let events = null;
    if (this.state.userEvents.length) {
      events = this.state.userEvents.map((event, idx) => {
        return (
            <li className="col-md-3">
              <Link to="/previouseventphotos"
              onClick={() => this.handlePreviousEventPhotos(event)}>
                <img src={event.event.eventPhoto || `http://unsplash.it/680/380?random=${idx}`} />
                  <p>
                    {event.event.eventName}
                  </p>
              </Link>
            </li>
        )
      })
    }
    return events;
  }

  handlePreviousEventPhotos(event) {
    this.props.setActivePreviousEvent(event)
  }

  render() {

    return (
      <div>

        <Header 
           brand="SPEAKEASY"
        />

        <section>
          <div className="container content-section text-center">
            <div className="row">
              <div className="container text-center row col-md-8 col-md-offset-2">
                <ul>
                  {this.renderEventMessage()}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <Portfolio
          renderEvents={this.renderEvents}
        />

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
    photos: state.active_previous_event
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setActivePreviousEvent: setActivePreviousEvent,
    clearActivePreviousEvent: clearActivePreviousEvent
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(User_Events)
