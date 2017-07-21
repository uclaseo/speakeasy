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

const history = createBrowserHistory({forceRefresh:true});
class Event_Setting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      currenEventLocation: [],
      eventPicture: [],
      tempEventProfilePicture: ''
      
    }
    this.getEventLocation = this.getEventLocation.bind(this)
    this.renderPhoto = this.renderPhoto.bind(this)
    this.onDrop = this.onDrop.bind(this);
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
    

    axios.post('/api/event/create', {
      eventName: values.eventname,
      password: values.password,
      latitude: this.state.currenEventLocation[0],
      longitude: this.state.currenEventLocation[1],
      userId: this.props.profile.id,
      isLive: true,
      eventPhoto: this.state.tempEventProfilePicture,
      description: values.description
    }).then((response) => {
      console.log("what's event id?", response.data.id)
      this.props.setActiveEvent(response.data)
      this.setState({ redirect: true })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  onDrop(acceptedFile, rejectedFile) {
    console.log("acceptedFiles", acceptedFile[0]);
    console.log("rejectedFiles", rejectedFile)
    
    this.setState({
      eventPicture: acceptedFile[0]
    },()=>{
      console.log("eventPicture before this.upload()", this.state.eventPicture)
      this.upload();
    })
    

    //don't do upload yet, do it after you get the eventId
    // this.upload();
  }


  renderPhoto() {
    return (
      <section id="event-profile-pic">
        <div className="dropzone text-center center-block">
          <Dropzone onDrop={this.onDrop} accept="image/jpeg, image/png" className="center-block">
            {console.log("in Dropzone")}
             <img
              src={this.state.tempEventProfilePicture || 'http://www.citi.io/wp-content/uploads/2015/08/1168-09-neworleans.jpg'}
              id="event-profile-pic"
              className="img-rounded img-responsive center-block"
              width="304"
              height="236"
            /> 
          </Dropzone>
          <p className="center-block">click to change your event profile pic</p>
        </div>
      </section>
    )
  }



  upload() {
    const id = this.props.profile.id;
    console.log("this.state.eventPhoto's name", this.state.eventPicture.name)

    const images = {};
    // image = Math.floor(Math.random()*10000) + this.state.eventPicture.name
    
    // this.state.eventPicture.map((file, index) => {
      images[0] = Math.floor(Math.random() * 10000) + this.state.eventPicture.name
    // });
    
    axios.post(`/api/user/profile/${id}/geturl`, images)
      .then((response) => {
        console.log("getting in to axios.post? ", response);
        // axios.put(response.data[0].url, 0)
        // .then((awsResponse) =>{
        //   this.registerImageUrl(response.data[0])
        // })
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
    console.log("is it different from imageData in Userprofile??", imageData.imageLink)
    this.setState({
      tempEventProfilePicture: imageData.imageLink 
    })


    //edit the event profile picture here
    // this.props.profile.photo = imageData.imageLink;
    // this.props.editUserProfile(profile, profile.id);
    
    //USE IF YOU WANT TO REFRESH THE EVENT PROFILE PICS
    // this.setState({
    //   files: []
    // });
  }


  render() {
    const { handleSubmit } = this.props;
    console.log("what is the props in event_setting", this.props)
    console.log('what is ithe state of redirect ', this.state.redirect);
    if (this.state.redirect === true) {
      return <Redirect to='/active_event'/>;
    }

    return (
      <div id="user-profile">
        {this.renderPhoto()}

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
            label="description"
            name="description"
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
  }
}
export default reduxForm({
  validate: validate,
  form: 'EventSettingForm'
})(connect( mapStateToProps,mapDispatchToProps)(Event_Setting));
