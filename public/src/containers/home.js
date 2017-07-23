import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Auth from '../Auth0/Auth0';
import { bindActionCreators } from 'redux';
import { fetchProfile } from '../actions/user_actions';
import SimpleForm from './event_setting';
import turf from 'turf'
import { setNearbyEvents } from '../actions/index.js';
import NearbyEventDetail from '../components/nearbyEventDetail';
import { setActiveEvent } from '../actions/activeEventAction';
import { clearEventMessages } from '../actions/eventMessagesActions';
import Header from '../components/header';

const ROOT_URL = 'localhost:8080';
const auth = new Auth();
class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userLocation: [],
      gettingUserLocation: true,
      noNearbyEvents: false,
      nearbyEventProfilePicture: ''
    }

    this.registerUser = this.registerUser.bind(this);
    this.getNearbyEvents = this.getNearbyEvents.bind(this);
    this.getUserLocation = this.getUserLocation.bind(this);
    this.handleEventClick = this.handleEventClick.bind(this);
  }

  componentDidMount() {
    this.props.clearEventMessages()
    auth.getProfile((error, profile) => {
      this.registerUser(profile);
    });
    this.getUserLocation(this.getNearbyEvents);
  }

  registerUser(profile) {
    axios.post(`/api/user/signup`, profile)
      .then((response) => {
        this.props
          .fetchProfile(response.data);
      })
      .catch((error) => {
        console.log('this is registerUser error', error);
      })
  }

  getUserLocation(cb) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          userLocation: [position.coords.latitude, position.coords.longitude]
        }, () => {
          cb();
        })
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  getNearbyEvents() {
    var nearbyEvents = [];
    axios.get("/api/event/searchevents")
      .then(response => {
        for (var i = 0; i < response.data.length; i++) {
          if (this.getDistance([this.state.userLocation[0], this.state.userLocation[1]], [response.data[i].latitude, response.data[i].longitude])) {
            nearbyEvents.push(response.data[i]);
          }
        }
      })
      .then(() => {
        this.props.setNearbyEvents(nearbyEvents);
      })
      .then(() => {
        this.setState({
          gettingUserLocation: false
        })
      })
      .catch((error) => {
        console.log("getNearbyEvents get request failed", error)
      })
  }

  getDistance(fromPoint, toPoint) {
    var from = {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [fromPoint[0], fromPoint[1]]
      }
    };
    var to = {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [toPoint[0], toPoint[1]]
      }
    };
    var points = {
      "type": "FeatureCollection",
      "features": [from, to]
    };
    var distance = turf.distance(from, to, "miles");
    // console.log("distance between two points", distance);
    return distance < 0.5;
  }

  handleEventClick(event) {
    this.props.setActiveEvent(event, this.props.profile.id);
  }

  renderEvents() {
  console.log("this.props.nearbyEvents:::", this.props.nearbyEvents);
    let events = null;
    if (this.props.nearbyEvents.length !== 0) {
      events = this.props.nearbyEvents.map((event, idx) => {
        return (
          <div key={idx}>
            <NearbyEventDetail
              idx={idx}
              event={event}
              handleEventClick={this.handleEventClick}
            />
          </div>
        )
      })
    }
    return events;
  }

  renderEventMessage() {
    let msg;
    if (this.state.gettingUserLocation) {
      msg = 'Searching for nearby events...';
    } else {
      if (this.props.nearbyEvents.length) {
        msg = 'Nearby events';
      } else {
        msg = 'No nearby events';
      }
    }

    return (
      <div className="container content-section text-center col-lg-8 col-lg-offset-2 ">
        <h2>{msg}</h2>
      </div>
    );
  }

  renderEvents() {
    let events = null;
    if (this.props.nearbyEvents.length !== 0) {
      events = this.props.nearbyEvents.map((event) => {
        return (
          <div>
            <NearbyEventDetail 
              event={event} 
              key={event.id}
              handleEventClick={this.handleEventClick}
            />
            
          </div>
        )
      })
    } 
  }

  render() {
    return (
      <div>

        <Header />

        <section>
          <div className="container content-section text-center">
            <div className="container text-center row col-md-8 col-md-offset-2 row">
              <Link to="/event_setting" className="btnghost">
                <i className="fa"></i>
                Host an Event
                </Link>
              {this.renderEventMessage()}
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
  return { nearbyEvents: state.nearbyEvents, profile: state.profile };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setNearbyEvents, fetchProfile, setActiveEvent, clearEventMessages }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);