import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Auth from '../Auth0/Auth0';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchProfile} from '../actions/authAction';
const ROOT_URL = 'localhost:8080';

const auth = new Auth();

class Home extends Component {

  constructor(props) {
    super(props);
    this.registerUser = this.registerUser.bind(this);
  }

  componentDidMount() {
    auth.getProfile((error, profile) => {
      this.props.fetchProfile(profile);
      this.registerUser(profile);
    });


  }

registerUser(profile) {
  axios.post(`/api/user/signup`, profile)
  .then((response) => {
    console.log('this is response', response);
    
  })
  .catch((error) => {
    console.log('this is error', error);
  })
}

getUserInfo() {
}

  render() {
    
    return (
      <div>
        <div className="jumbotron">
          <div className="container text-center">
            <h1>Speakeasy</h1>
            <p>Some info about our application</p>
          </div>
        </div>
        <div className="container-fluid bg-3 text-center">
          <div className="row">
            <div className="col-sm-3">
              <p>Some event..</p>
              <img
                src="https://placehold.it/150x80?text=IMAGE"
                className="img-responsive"
                style={{ width: '100%' }}
                alt="Image"
              />
            </div>
            <div className="col-sm-3">
              <p>Some event..</p>
              <img
                src="https://placehold.it/150x80?text=IMAGE"
                className="img-responsive"
                style={{ width: '100%' }}
                alt="Image"
              />
            </div>
            <div className="col-sm-3">
              <p>Some event...</p>
              <img
                src="https://placehold.it/150x80?text=IMAGE"
                className="img-responsive"
                style={{ width: '100%' }}
                alt="Image"
              />
            </div>
            <div className="col-sm-3">
              <p>Some event...</p>
              <img
                src="https://placehold.it/150x80?text=IMAGE"
                className="img-responsive"
                style={{ width: '100%' }}
                alt="Image"
              />
            </div>
          </div>
          <br />
          <br />
          <Link to="/event_setting">
            <button
              type="button" className="btn btn-secondary btn-lg myBtns">Create Event
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    profile: state.profile
  };
}

export default connect(mapStateToProps, {fetchProfile})(Home);
