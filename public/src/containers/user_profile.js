import React, { Component } from 'react';
import Auth from '../Auth0/Auth0'

const auth = new Auth();

class User_Profile extends Component {
  constructor(props) {
    super(props);
    this.getProfile = this.getProfile.bind(this);
  }

  getProfile() {
    auth.getProfile((err, profile) => {
      if (profile) {
        console.log('profile', profile);
      } else {
        console.log('error', err);
      }

    })
  }
  render() {
    return (
      <div>
        User Profile
      </div>
    );
  }
}

export default User_Profile;