import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';

import {setActivePreviousEvent, clearActivePreviousEvent} from '../actions/activePreviousEvent'

class User_Events extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userEvents: [],
      photos: []
    }
    this.handlePreviousEventPhotos = this.handlePreviousEventPhotos.bind(this);
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
      msg = 'Some past events';
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
    if (this.state.userEvents.length !== 0) {
      events = this.state.userEvents.map((event, index) => {
        return (
          <div key={index} className="event-detail">
          <Link to="/previouseventphotos"
          onClick={() => this.handlePreviousEventPhotos(event)}>
            <li className="col-md-3">
              <img src={event.event.eventPhoto} />
              <div className="text-center">
                <p>
                {event.event.eventName}
                </p>
              </div>
            </li>
          </Link>
          </div>
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

        <header className="intro">
          <div className="intro-body">
            <div className="container row col-md-8 col-md-offset-2">
              <div className="row">
                <div className="col-md-8 col-md-offset-2">
                  <h1 className="brand-heading">SPEAKEASY</h1>
                </div>
              </div>
            </div>
          </div>
        </header>

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

        <section id="portfolio">
          <div className="gallery">
            <ul>
              {this.renderEvents()}
            </ul>
            
          </div>
        </section>

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
