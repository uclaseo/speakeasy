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

const ROOT_URL = 'localhost:8080';
const auth = new Auth();
class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      gettingUserLocation : true,
      noNearbyEvents: false,
      nearbyEventProfilePicture: ''
    }

    this.registerUser = this
      .registerUser
      .bind(this);
    this.getNearbyEvents = this
      .getNearbyEvents
      .bind(this);
    this.getUserLocation = this
      .getUserLocation
      .bind(this);
    this.handleEventClick = this
      .handleEventClick
      .bind(this);
  }

  componentDidMount() {
    this.props.clearEventMessages()
    auth.getProfile((error, profile) => {
      this.registerUser(profile);
    });
    this.getUserLocation(this.getNearbyEvents);
  }

  registerUser(profile) {
    // console.log("what's registerUser profile arg", profile)
    axios
      .post(`/api/user/signup`, profile)
      .then((response) => {
        console.log('registerUser response', response);
        this
          .props
          .fetchProfile(response.data);
      })
      .catch((error) => {
        console.log('this is registerUser error', error);
      })
  }

  getUserLocation(cb) {
    if (navigator.geolocation) {
      navigator
        .geolocation
        .getCurrentPosition((position) => {
          // console.log("getting position via html5", position.coords)
          this.setState({
            userLocation: [position.coords.latitude, position.coords.longitude]
          }, () => {
            // console.log("what is the user location?", this.state.userLocation);
            cb();
          })
        });
    } else {
      // console.log("Geolocation is not supported by this browser.");
    }
  }

  getNearbyEvents() {
    var nearbyEvents = [];
    axios.get("/api/event/searchevents")
    .then((response) => {
      // console.log("before we compare, this.state.userLocation is", this.state.userLocation)
      for (var i = 0; i < response.data.length; i ++) {
        if (this.getDistance([this.state.userLocation[0], this.state.userLocation[1]], [response.data[i].latitude, response.data[i].longitude])){
          // console.log("what are the nearbyEvents?", response.data);
          nearbyEvents.push(response.data[i]);

        }
      })
      .then(() => {
        this
          .props
          .setNearbyEvents(nearbyEvents);
      })
      .then(() => {
        this.setState({ gettingUserLocation: false })
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
    this
      .props
      .setActiveEvent(event, this.props.profile.id);
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
      events = this.props.nearbyEvents
        .map((event, idx) => {
          return (
            <NearbyEventDetail
              idx={idx}
              event={event}
              key={event.id}
              handleEventClick={this.handleEventClick}
            />)
        })
    }
    return events;
  }

  renderNoEvents() {
    let noEvents = null;
    if (this.state.gettingUserLocation === false) {
      if (this.props.nearbyEvents.length === 0) {
        noEvents = <div>No events nearby</div>
      }
    }
    return noEvents;
  }

  render() {

    return (
      <div>

        <header className="intro">
          <div className="intro-body">
            <div className="container">
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
              <div className="col-lg-8 col-lg-offset-2">
                <p>
                  Set up your own event chat based on your current location!
                </p>
              </div>
              <div

                className="container text-center row col-md-8 col-md-offset-2">
                <Link to="/event_setting" className="btnghost">
                  <i className="fa"></i>
                  Host an Event
                </Link>
              </div>
              <div className="col-lg-8 col-lg-offset-2">
                <p>
                  Or join a nearby event!
                </p>
              </div>

            </div>
          </div>
        </section>


        <section id="portfolio">
          <div className="gallery">
            <ul>
              {this.renderEvents()}
            </ul>
            {this.renderNoEvents()}
          </div>
        </section>
      </div>

    );
  }
} function mapStateToProps(state) {
  return { nearbyEvents: state.nearbyEvents, profile: state.profile };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({ setNearbyEvents, fetchProfile, setActiveEvent, clearEventMessages }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);