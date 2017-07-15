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

    this.state = {
      profile: this.props.profile, //not necessary
      defaultPic: 'http://bit.ly/2tRR5GW'
    };
  }

  componentDidMount() {
    console.log('user profile from redux:', this.props.profile);
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-error' : ''}`;

    return (
      <div className={className}>
        <label>
          {field.label}
        </label>
        <input
          className="form-control"
          type="text"
          placeholder={field.placeholder}
          {...field.input}
        />
        <div className="help-block">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  renderProfilePhoto() {
    return (
      <div>
        <img src={profile.photo || this.state.defaultPic} />
      </div>
    );
  }

  suggestName(name) {
    name = name || '';
    let idx = name.indexOf('@');
    return idx > 0 ? name.substring(0, idx) : name;
  }

  suggestChatHandle(handle, name) {
    handle = handle || '';
    name = this.props.profile.name || '';
    return handle ? handle : name.substring(0, 4);
  }

  onSubmit(values) {
    console.log('values:', values, this.props.profile.id);
    this.props.editUserProfile(values, this.props.profile.id);
  }

  render() {
    const { handleSubmit } = this.props;
    const { profile } = this.props;

    console.log('this.props from user_profile:', this.props);

    return (
      <div id="user-profile">
        <div>
          <img
            src={profile.photo || 'http://bit.ly/2tRR5GW'}
            id="user-profile-pic"
            className="img-circle img-responsive"
            width="304"
            height="236"
          />
        </div>

        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div>
            <Field
              label="Your name"
              name="name"
              type="text"
              placeholder={this.suggestName(profile.name)}
              component={this.renderField}
            />
          </div>
          <Field
            label="Create a chat handle name"
            name="handle"
            type="text"
            placeholder={this.suggestChatHandle(profile.handle, profile.name)}
            component={this.renderField}
          />

            <button type="submit" className="btn btn-secondary btn-lg my-btns">
              Submit
            </button>

          <Link to="/home">
            <button type="button" className="btn btn-danger btn-lg my-btns">
              Cancel
            </button>
          </Link>
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
    error.handle = 'Enter a chat handle name';
  }

  return error;
}

function mapStateToProps(state) {
  return {
    profile: state.profile
  };
}

export default reduxForm({
  validate: validate,
  form: 'ProfileForm'
})(connect(mapStateToProps, { editUserProfile, fetchProfile })(User_Profile));
