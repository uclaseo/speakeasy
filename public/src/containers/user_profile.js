import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import Auth from '../Auth0/Auth0';
import { fetchProfile } from '../actions/authAction';
import { editUserProfile } from '../actions/index';

const auth = new Auth();

class User_Profile extends Component {
  
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

  onSubmit(values, id) {
    console.log('values:', values);
    console.log('this.props', this.props);
    this.props.editUserProfile(values, 6);
  }

  render() {
    const { handleSubmit } = this.props;
    console.log('render in userprofile', this.props)
    return (
      <div id="user-profile">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Name"
            name="name"
            type="text"
            component={this.renderField}
          />
    
          <Field
            label="Handle"
            name="handle"
            type="text"
            component={this.renderField}
          />

          <Field
            label="Email"
            name="email"
            type="text"
            component={this.renderField}
          />

          <Field
            label="Password"
            name="password"
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
  if (!values.name) {
    error.name = 'Enter your name';
  }

  if (!values.handle) {
    error.handle = 'Enter your handle';
  }

  if (!values.email) {
    error.email = 'Enter your email';
  }

  if (!values.password) {
    error.password = 'Enter your password';
  }

  return error;
}

function mapStateToProps(state) {
  return {
    profile: state.profile
  }
}


export default reduxForm({
  validate: validate,
  form: 'ProfileForm'
})(connect(mapStateToProps, { editUserProfile, fetchProfile })(User_Profile));


