import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import Auth from '../Auth0/Auth0';
import { fetchProfile } from '../actions/authAction';
import { setActiveEventId, setCurrentLocation } from '../actions/index';
import axios from 'axios';
import GoogleMap from './google_map';
import { geolocated } from 'react-geolocated';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory({forceRefresh:true});

class Event_Setting extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // console.log("can i get location from here?", currentLocation);
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

  onSubmit(values) {
    console.log('values in event_setting 1:', values);
    console.log("gettign location from store?", this.props.currentLocation);
    console.log("userid?", this.props.profile)
    axios.post('/api/event/create', {
      eventName: values.eventname,
      password: values.password,
      latitude: this.props.currentLocation.lat,
      longitude: this.props.currentLocation.lng,
      userId: this.props.profile.id,
      isLive: values.isLive
    }).then((response) => {
      console.log("what's event id?", response.data.id)
      this.props.setActiveEventId(response.data.id);
      history.push("/active_event");
    }).catch((error) => {
      console.log(error)
    })
  }

  render() {
    const { handleSubmit } = this.props;

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
        <GoogleMap />    
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
  return bindActionCreators({ setActiveEventId, setCurrentLocation }, dispatch)
}


function mapStateToProps(state) {
  return {
    currentLocation: state.event.currentLocation,
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
