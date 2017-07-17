import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Auth from '../Auth0/Auth0';
import { fetchProfile } from '../actions/authAction';
import { setActiveEventId, setCurrentEventLocation } from '../actions/index';
import axios from 'axios';

import { geolocated } from 'react-geolocated';
import createBrowserHistory from 'history/createBrowserHistory';
import { setActiveEvent } from './../actions/activeEventAction';

const history = createBrowserHistory();

class Event_Setting extends Component {

  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      currenEventLocation: [],
      
    }
    this.getEventLocation = this.getEventLocation.bind(this)
  }


  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-error' : ''}`;

    return (
      <div className={className}>
        <label>
          {field.label}
        </label>
        <input className="form-control" type="text" {...field.input} />
        <div className="help-block">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  componentDidMount(){
    this.getEventLocation();
  }

  getEventLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          console.log("getting position via html5", position.coords)
          this.setState({
            currenEventLocation : [position.coords.latitude, position.coords.longitude]
          }, () => {
            console.log("what is the user location?", this.state.currenEventLocation);
            // cb();
          })  
        });
    } else { 
        console.log("Geolocation is not supported by this browser.");
    }
  }

  onSubmit(values) {
    console.log("this.state in onSubmit", this.state)

    axios.post('/api/event/create', {
      eventName: values.eventname,
      password: values.password,
      latitude: this.state.currenEventLocation[0],
      longitude: this.state.currenEventLocation[1],
      userId: this.props.profile.id,
      isLive: values.isLive
    }).then((response) => {
      console.log("what's event id?", response.data.id)
      this.props.setActiveEvent(response.data)
      this.setState({ redirect: true })
    }).catch((error) => {
      console.log(error)
    })
  }

  render() {
    const { handleSubmit } = this.props;

    if (this.state.redirect === true) {
      return <Redirect to='/active_event'/>;
    }

    return (
      <div id="user-profile">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="EventName"
            name="eventname"
            type="text"
            component={this.renderField}
          />

          <Field
            label="Password"
            name="password"
            type="text"
            component={this.renderField}
          />

          <Field
            label="IsLive"
            name="isLive"
            type="text"
            component={this.renderField}
          />
          
            <button type="submit" className="btn btn-secondary btn-lg myBtns">
                Submit
            </button>
          
        </form>
        {/* <GoogleMap />     */}
        {/* <div> latitude {this.props.coords.latitude} </div>
        <div> longitude {this.props.coords.longitude} </div>  */}
      </div>
    );
  }
}

function validate(values) {
  const error = {};

  if (!values.eventname) {
    error.eventname = 'Enter your eventname';
  }

  if (!values.pasword) {
    error.pasword = 'Enter your pasword';
  }

  if (!values.latitude) {
    error.latitude = 'Enter your latitude';
  }

  if (!values.Longitude) {
    error.Longitude = 'Enter your Longitude';
  }

  if (!values.isLive) {
    error.isLive = 'Enter your isLive';
  }

  return error;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setActiveEvent, setCurrentEventLocation }, dispatch)
}


function mapStateToProps(state) {
  return {
    currentLocation: state.active_event_location,
    profile: state.profile
  }
}

export default reduxForm({
  validate: validate,
  form: 'EventSettingForm'
})(connect( mapStateToProps,mapDispatchToProps)(Event_Setting));


// geolocated({
//   positionOptions: {
//     enableHighAccuracy: false,
//   },
//   userDecisionTimeout: 5000,
// })(Event_Setting);

// export default reduxForm({
//   validate: validate,
//   form: 'EventSettingForm'
// })(connect(mapDispatchToProps, { setActiveEventId })(geolocated({
//   positionOptions: {
//     enableHighAccuracy: false,
//   },
//   userDecisionTimeout: 5000,
// })(Event_Setting)));
