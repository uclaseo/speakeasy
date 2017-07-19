import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios'

class User_Events extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userEvents: [],
      photos: []
    }
    this.showEventPhotos = this.showEventPhotos.bind(this);
  }

  componentWillMount() {
    console.log("user id is ", this.props.profile)
    // axios.get(`/api/event/fetchuserevents/${this.props.profile.id}`)
    axios.get(`/api/event/fetchuserevents/${this.props.profile.id}`)
      .then((response) => {
        console.log("getting stuff from user 1's events", response.data)
        this.setState({
          userEvents: response.data,
        })

      })
      .catch((error) => {
        consol.log("not getting user1's event", error);
      })
  }

  showEventPhotos(clickedEvent) {
    console.log('fucking clicked event', clickedEvent)
    console.log('clicked event Id', clickedEvent.eventId);
    axios.get(`/api/event/image/fetcheventimages/${clickedEvent.eventId}`)
    .then((response) => {
      console.log('this is response for event images', response);
      const photos = response.data;
      this.setState({
        photos
      })

    })
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">

          <div className="col-md-4">
            <ul>
              <h3>Previous Event </h3>
              {/*{console.log("what's userID in user_events", this.props.profile.userID)}*/}

              {this.state.userEvents.length > 0 ?
                this.state.userEvents.map((userEvent) => {
                  return <li onClick={() => this.showEventPhotos(userEvent)}>{userEvent.event.eventName} </li>
                }) : null
              }
            </ul>
          </div>

          <div className="col-md-8">
            <ul>
              {this.state.photos ? this.state.photos.map((photo) => {
                return <li><img src={photo.imageLink} /></li>
              }) : null}
            </ul>
          </div>

        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile
  }
}


export default connect(mapStateToProps)(User_Events)
