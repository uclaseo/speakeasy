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
import Dropzone from 'react-dropzone';

import { geolocated } from 'react-geolocated';
import createBrowserHistory from 'history/createBrowserHistory';
import { setActiveEvent } from './../actions/activeEventAction';
import Header from '../components/header';


const history = createBrowserHistory({ forceRefresh: true });
class Event_Setting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      currentEventLocation: [],
      eventPicture: [],
      tempEventProfilePicture: ''

    }
    this.getEventLocation = this.getEventLocation.bind(this)
    this.renderPhoto = this.renderPhoto.bind(this)
    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {
    this.getEventLocation();
  }

  getEventLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('geolocation.coords:', position.latitude, position.longitude);
        this.setState({
          currentEventLocation: [position.coords.latitude, position.coords.longitude]
        })
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  renderPhoto() {
    return (
      <div id="event-profile-pic">
        <div className="dropzone text-center center-block">
          <Dropzone onDrop={this.onDrop} accept="image/jpeg, image/png" className="center-block">
            <img
              src={this.state.tempEventProfilePicture || 'http://bit.ly/2toy1xv'}
              className="img-rounded img-responsive center-block profile-pic"
              width="608"
              height="472"
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
        <input className="form-control" type="text" {...field.input} />
        <div className="help-block">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onDrop(acceptedFile, rejectedFile) {
    this.setState({
      eventPicture: acceptedFile[0]
    }, () => {
      console.log("eventPicture before this.upload()", this.state.eventPicture)
      this.upload();
    })
  }

  upload() {
    const id = this.props.profile.id;
    const images = {};
    images[0] = Math.floor(Math.random() * 10000) + this.state.eventPicture.name

    axios.post(`/api/user/profile/${id}/geturl`, images)
      .then((response) => {
        let counter = 0;
        response.data.map((eachFile) => {
          axios.put(eachFile.url, this.state.eventPicture)
            .then((awsResponse) => {
              counter++;
              this.registerImageUrl(eachFile);
              console.log("no error in axios.post, response is ", awsResponse);
            })
          counter++;
        })
      })
      .catch((error) => {
        console.log('error in upload');
      })
  }


  registerImageUrl(eachFile) {
    const imageData = {
      name: eachFile.fileName,
      imageLink: `https://s3-us-west-1.amazonaws.com/hrlaspeakeasy/${eachFile.fileName}`,
    };
    this.setState({
      tempEventProfilePicture: imageData.imageLink
    })
  }


  onSubmit(values) {
    axios.post('/api/event/create', {
      userId: this.props.profile.id,
      eventName: values.eventname,
      password: values.password,
      latitude: this.state.currentEventLocation[0],
      longitude: this.state.currentEventLocation[1],
      isLive: true,
      description: values.description,
      eventPhoto: this.state.tempEventProfilePicture
    })
      .then((response) => {
        this.props.setActiveEvent(response.data)
        this.setState({ redirect: true })
      })
      .catch((error) => {
        console.log(error)
      })
  }


  render() {
    const { handleSubmit } = this.props;
    if (this.state.redirect === true) {
      return <Redirect to='/active_event' />;
    }

    return (
      <div>

        <Header
          renderPhoto={this.renderPhoto}
          label={'Click to change your event photo'}
        />

        <section>
          <div className="container content-section row col-lg-8 col-lg-offset-2">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} id="profileform">
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
                label="description"
                name="description"
                type="text"
                component={this.renderField}
              />

              <div className="container text-center row col-md-8 col-md-offset-2">
                <button type="submit" className="btnghost">Submit</button>
                <Link to="/home">
                  <button type="button" className="btnghost">Cancel</button>
                </Link>
              </div>

            </form>
          </div>
        </section>

      </div>
    )
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

  return error;
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setActiveEvent, setCurrentEventLocation }, dispatch)
}

function mapStateToProps(state) {
  return {
    currentLocation: state.active_event_location,
    profile: state.profile,
    eventPhoto: state.eventPhoto,
    eventId: state.eventId
  }
}
export default reduxForm({
  validate: validate,
  form: 'EventSettingForm'
})(connect(mapStateToProps, mapDispatchToProps)(Event_Setting));
