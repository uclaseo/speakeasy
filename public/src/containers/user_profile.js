import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Header from '../components/header';
import { Col, Grid, Row } from 'react-bootstrap';



import Auth from '../Auth0/Auth0';
import { fetchProfile, editUserProfile } from '../actions/user_actions';

const auth = new Auth();

class User_Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      files: [],
    };
    this.upload = this.upload.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.renderPhoto = this.renderPhoto.bind(this);
  }

  renderPhoto() {
    return (
      <div id="user-profile-pic">
        <div className="dropzone text-center center-block">
          <Dropzone onDrop={this.onDrop} accept="image/jpeg, image/png" className="center-block">
            <img
              src={this.props.profile.photo}
              className="img-rounded img-responsive center-block profile-pic"
              width="456"
              height="708"
            />
          </Dropzone>
        </div>
      </div>
    )
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

  renderSuccess() {
    const success = (this.state.submitted) ? 'Successfully updated profile' : '';
    return (
      <div>
        {success}
      </div>
    );
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
      images[index] = Math.floor(Math.random() * 10000) + file.name;
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

    this.setState({
      files: [],
    });

    let changes = {
      id: this.props.profile.id,
      name: this.props.profile.name,
      handle: this.props.profile.handle,
      photo: imageData.imageLink
    };

    this.props.editUserProfile(changes, this.props.profile.id);
  }

  onSubmit(values) {
    let changes = {
      id: this.props.profile.id,
      name: values.name || this.props.profile.name,
      handle: values.handle || this.props.profile.handle,
      photo: this.props.profile.photo
    };

    this.props.editUserProfile(changes, this.props.profile.id);
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

        <Header
          renderPhoto={this.renderPhoto}
          label={''}
        />

        <section>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))} id="contactform" className="text-center">

            <div className="settings">
              <ul>
                <Grid>
                  <Col>
                    <Field
                      label="Your name"
                      name="name"
                      type="text"
                      placeholder={this.showPlaceHolder('name')}
                      component={this.renderField}
                    />
                    <Field
                      label="Create a chat handle"
                      name="handle"
                      type="text"
                      placeholder={this.showPlaceHolder('handle')}
                      component={this.renderField}
                    />
                  </Col>
                </Grid>
              </ul>
            </div>

            <div className="container text-center row col-md-8 col-md-offset-2">
              <button type="submit" className="btnghost">Submit</button>
              <Link to="/home">
                <button type="button" className="btnghost">Cancel</button>
              </Link>
              {this.renderSuccess()}
            </div>

          </form>
        </section>



      </div>
    );
  }


}

function validate(values) {
  const error = {};
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
})(connect(mapStateToProps, { fetchProfile, editUserProfile })(User_Profile));
