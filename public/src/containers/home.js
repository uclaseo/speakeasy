import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Auth from '../Auth0/Auth0';
import { bindActionCreators } from 'redux';
import { fetchProfile } from '../actions/user_actions';
import SimpleForm from './event_setting';
import turf from 'turf-distance'
import { setNearbyEvents } from '../actions/index.js';
import NearbyEventDetail from '../components/nearbyEventDetail';
import { setActiveEvent } from '../actions/activeEventAction';
import { clearEventMessages } from '../actions/eventMessagesActions';
import Header from '../components/header';
import Portfolio from '../components/portfolio';


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
    this.renderEvents = this.renderEvents.bind(this);
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
    var distance = turf(from, to, "miles");
    // console.log("distance between two points", distance);
    return distance < 0.5;
  }

  handleEventClick(event) {
    this.props.setActiveEvent(event, this.props.profile.id);
  }

  renderEvents() {
    let events = null;
    if (this.props.nearbyEvents.length) {
      events = this.props.nearbyEvents.map((event, idx) => {
        return (
          <div key={idx} >
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
      msg = 'SEARCHING FOR NEARBY EVENTS...';
    } else {
      if (this.props.nearbyEvents.length) {
        msg = 'NEARBY EVENTS';
      } else {
        msg = 'NO NEARBY EVENTS';
      }
    }
    return (
      <div className="">
        <h2>{msg}</h2>
      </div>
    );
  }

  render() {
    console.log("this.props:::", this.props);
    return (
      <div>

        <Header
          brand="SPEAKEASY"
        />

        <section>
          <div className="container content-section text-center">
            <div className="container text-center row col-md-8 col-md-offset-2">
              <Link to="/event_setting" className="btnghost">
                <i className="fa"></i>
                Host an Event
                </Link>
              {this.renderEventMessage()}
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
  return { nearbyEvents: state.nearbyEvents, profile: state.profile };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setNearbyEvents, fetchProfile, setActiveEvent, clearEventMessages }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);