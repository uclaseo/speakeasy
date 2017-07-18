import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import Auth from '../Auth0/Auth0';
import axios from 'axios';

import { fetchProfile, editUserProfile } from '../actions/user_actions';

const auth = new Auth();

class User_Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: this.props.profile,
      submitted: false,
      files: []
    };
    this.upload = this.upload.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {
    console.log('REDUX :', this.props);
    this.props.fetchProfile(this.props.profile);
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

  renderPhoto() {
    return (
      <section id="user-profile-pic">
        <div className="dropzone text-center center-block">
          <Dropzone onDrop={this.onDrop} accept="image/jpeg, image/png" className="center-block">
            <img
              src={this.props.profile.data.photo || 'https://s3-us-west-1.amazonaws.com/inseokspeakeasy/1722Speakeasy1.png'}
              id="user-profile-pic"
              className="img-rounded img-responsive center-block"
              width="304"
              height="236"
            />
          </Dropzone>
          <p className="center-block">click to change your profile pic</p>
        </div>
      </section>
    )
  }

  renderSuccess() {
    const success = (this.state.submitted) ? 'Successfully updated profile' : '';
    return (<div>{success}</div>);
  }

  onDrop(acceptedFiles, rejectedFiles) {
    let array = this.state.files;
    acceptedFiles.map(file => {
      array.push(file);
    })
    this.setState({
      files: array
    })
    this.upload();
  }

  upload() {
    const id = this.props.profile.data.id;
    const images = {};

    this.state.files.map((file, index) => {
      images[index] = Math.floor(Math.random() * 10000) + file.name
    });
    
    axios.post(`/api/user/profile/${id}/geturl`, images)
      .then((response) => {
        let counter = 0;
        response.data.map((eachFile) => {
          axios.put(eachFile.url, this.state.files[counter])
            .then((awsResponse) => {
              counter++;
              this.registerImageUrl(eachFile);
            })
          counter++;
        })
      })
      .catch((error) => {
        console.log('error in upload', error);
      })
  }

  registerImageUrl(eachFile) {
    const imageData = {
      name: eachFile.fileName,
      imageLink: `https://s3-us-west-1.amazonaws.com/inseokspeakeasy/${eachFile.fileName}`,
    };

    let profile = this.props.profile;
    profile.data.photo = imageData.imageLink;
    this.props.editUserProfile(profile, profile.data.id);
    this.setState({
      files: []
    });
  }

  onSubmit(values) {
    let profile = this.props.profile;
    profile.data.name = values.name;
    profile.data.handle = values.handle;
    this.props.editUserProfile(profile, profile.data.id);
    this.setState({ submitted: true });
  }

  showPlaceHolder(label) {
    const { email, name, handle } = this.props.profile.data;
    let tmp = email || '';
    if (label === 'name') {
      return name || tmp.substring(0, tmp.indexOf('@'));
    } else if (label === 'handle') {
      return handle ? handle : tmp.substring(0, 4);
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div id="user-profile" className="container-fluid bg-3 text-center" >
        {this.renderPhoto()}

        < form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
          <div>
            <Field
              label="Your name"
              name="name"
              type="text"
              placeholder={this.showPlaceHolder('name')}
              component={this.renderField}
            />
          </div>
          <Field
            label="Create a chat handle"
            name="handle"
            type="text"
            placeholder={this.showPlaceHolder('handle')}
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
        </form >
        <div>
          {this.renderSuccess()}
        </div>
      </div >
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
