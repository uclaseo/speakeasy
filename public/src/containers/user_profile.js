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
    {console.log("this.props.profile.photo",this.props.profile.photo)}
    return (
      <section id="user-profile-pic">
        <div className="dropzone text-center center-block">
          <Dropzone onDrop={this.onDrop} accept="image/jpeg, image/png" className="center-block">
            <img
              src={this.props.profile.photo}
              id="user-profile-pic"
              className="img-rounded img-responsive center-block"
              width="304"
              height="236"
            />
          </Dropzone>
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
    const id = this.props.profile.id;
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
      imageLink: `https://s3-us-west-1.amazonaws.com/hrlaspeakeasy/${eachFile.fileName}`,
    };

    let profile = this.props.profile;
    profile.photo = imageData.imageLink;
    this.props.editUserProfile(profile, profile.id);
    this.setState({
      files: []
    });
  }

  onSubmit(values) {
    let profile = this.props.profile;
    profile.name = values.name;
    profile.handle = values.handle;
    this.props.editUserProfile(profile, profile.id);
    this.setState({ submitted: true });
  }

  showPlaceHolder(label) {
    const { email, name, handle } = this.props.profile;
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
      <div>

        <header className="space">
          <div className="space-body">
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2">
                  {this.renderPhoto()}
                  <h1 className="brand-heading">your profile</h1>
                </div>
              </div>
            </div>
          </div>
        </header>

        
        <section id="profile">
          <div className="container content-section">
            <div className="row">
              <div className="col-lg-8 col-lg-offset-2">
                <form method="post" id="profileform">
                  <div className="form">
                    <input type="text" name="name" placeholder="Your Name *"/>
                    <input type="text" name="email" placeholder="Your chat handle *"/>
                    <textarea name="comment" rows="7" placeholder="A little about yourself *"></textarea>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>


        <section>
          <div className="container content-section text-center">
            <div className="row">
              <div
                className="container text-center row col-md-8 col-md-offset-2">
                <a className="btnghost">
                  <i className="fa"></i>
                  Submit
                </a>
              </div>
            </div>
          </div>
        </section>

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
