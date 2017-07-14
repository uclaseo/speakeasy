import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import Auth from '../Auth0/Auth0';
import { fetchProfile } from '../actions/authAction';
import { setActiveEventId } from '../actions/index';
import axios from 'axios';

class Event_Setting extends Component {
  
  constructor(props) {
    super(props);
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
    axios.post('/api/event/create', {
      eventName: values.eventname,
      password: values.password,
      latitude: values.latitude,
      longitude: values.longitude,
      isLive: values.isLive
    }).then((response) =>{
      console.log("what's event id?", response.data.id)
      this.props.setActiveEventId(response.data.id);
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
            label="Latitude"
            name="latitude"
            type="text"
            component={this.renderField}
          />

          <Field
            label="Longitude"
            name="longitude"
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
  return bindActionCreators({setActiveEventId}, dispatch)
}


export default reduxForm({
  validate: validate,
  form: 'EventSettingForm'
})(connect(mapDispatchToProps, {setActiveEventId})(Event_Setting));


