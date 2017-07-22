import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios'

import NearbyEventDetail from '../components/nearbyEventDetail';


class User_Events extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userEvents: [],
      photos: []
    }
    this.showEventPhotos = this.showEventPhotos.bind(this);
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

  showEventPhotos(clickedEvent) {
    axios.get(`/api/event/image/fetcheventimages/${clickedEvent.eventId}`)
      .then((response) => {
        console.log('this is response for event images', response);
        const photos = response.data;
        this.setState({
          photos: photos
        })
      })
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
    let events = null;
    if (this.state.userEvents.length !== 0) {
      events = this.state.userEvents.map((event, idx) => {
        return (
          <div key={idx}>
            <NearbyEventDetail
              idx={idx}
              event={event}
              handleEventClick={this.handleEventClick}
            />
            <img src={event.eventPhoto} />
          </div>
        )
      })
    }
    return events;
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
                {this.renderEventMessage()}
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
    profile: state.profile
  }
}

export default connect(mapStateToProps)(User_Events)
