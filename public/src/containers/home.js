import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Auth from '../Auth0/Auth0';
import {bindActionCreators} from 'redux';
import {fetchProfile} from '../actions/authAction';
import SimpleForm from './event_setting';
import turf from 'turf'
import {setNearbyEvents} from '../actions/index.js';
const ROOT_URL = 'localhost:8080';
const auth = new Auth();
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLocation : [],
      nearByEvents : [],
      gettingUserLocation : true,
    }
    this.registerUser = this.registerUser.bind(this);
    this.getNearbyEvents = this.getNearbyEvents.bind(this);
    this.getUserLocation = this.getUserLocation.bind(this);
  }
  componentDidMount() {
    auth.getProfile((error, profile) => {
      this.registerUser(profile);
      console.log('PROFILE FROM AUTH!!!', profile);
    });
    this.getUserLocation(this.getNearbyEvents);
    this.props.setNearbyEvents();
  }
  getUserLocation(cb){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          // console.log("getting position via html5", position.coords)
          this.setState({
            userLocation : [position.coords.latitude, position.coords.longitude]
          }, () => {
            // console.log("what is the user location?", this.state.userLocation);
            cb();
          })  
        });
    } else { 
        console.log("Geolocation is not supported by this browser.");
    }
  }
  getNearbyEvents(){
    axios.get("/api/event/searchevents")
    .then((response)=>{
      console.log("before we compare, this.state.userLocation is", this.state.userLocation)
      for (var i = 0; i < response.data.length; i ++){
        if (this.getDistance([this.state.userLocation[0], this.state.userLocation[1]], [response.data[i].latitude, response.data[i].longitude])){
          this.setState({
            nearByEvents: [...this.state.nearByEvents, response.data[i]],
            gettingUserLocation : false,
            
          },()=>{
            this.props.setNearbyEvents(this.state.nearByEvents);
            console.log("we got nearByEvent", this.state.nearByEvents);
          })
        }
      } 
    })
    .catch((error) =>{
      console.log("getNearbyEvents get request failed", error)
    })
  }
  getDistance(fromPoint, toPoint){
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
  registerUser(profile) {
    console.log("what's registerUser profile arg", profile)
    axios.post(`/api/user/signup`, profile)
    .then((response) => {
      console.log('registerUser response', response);
      this.props.fetchProfile(response.data);
    })
    .catch((error) => {
      console.log('this is registerUser error', error);
    })

  registerUser(profile) {
    axios
      .post(`/api/user/signup`, profile)
      .then(response => {
        console.log('User signed-up:', response);
        this.props.fetchProfile(response);
      })
      .catch(error => {
        console.log('this is error', error);
      });
  }

  getNearbyEvents() {
    axios
      .get('/api/event/searchevents')
      .then(response => {
        console.log('getNearbyEvents', response);
      })
      .catch(error => {
        console.log('getNearbyEvents get request failed', error);
      });
  }
  render() {
    return (
      <div>
        <div className="jumbotron">
          <div className="container text-center">
            <h1>Speakeasy</h1>
            <p>Some info about our application</p>
          </div>
        </div>
        <div className="container-fluid bg-3 text-center">
          {/* <div className="row">
            <div className="col-sm-3">
              <p>Some event..</p>
              <img
                src="https://placehold.it/150x80?text=IMAGE"
                className="img-responsive"
                style={{ width: '100%' }}
                alt="Image"
              />
            </div>
          </div> */}
          <br />
          <br />
          <Link to="/event_setting">
            <button
              type="button" className="btn btn-secondary btn-lg myBtns">Create Event
            </button>
          </Link>
          {this.state.nearByEvents.map((event)=>{
            return <div> {event.eventName} </div>
          })}
          {this.state.gettingUserLocation ? <div> Getting Nearby Events, please wait.... </div> : null}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    profile: state.profile,
    // nearbyEvents:state.nearbyEvents
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({setNearbyEvents,fetchProfile}, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps )(Home);
