import React, { Component } from 'react';
import Auth from '../Auth0/Auth0'

const auth = new Auth();

class User_Profile extends Component {
  constructor(props) {
    super(props);

    // this.getProfile = this.getProfile.bind(this);
  }

  componentDidMount() {
    this.setState({ 
       profile: {} 
    });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  // getProfile() {
  //   auth.getProfile((err, profile) => {
  //     if (profile) {
  //       console.log('profile', profile);
  //     } else {
  //       console.log('error', err);
  //     }

  //   })
  // }
  render() {
    if (!this.state.profile) {
      return <div>LOADING</div>
    }
    return (
      <div>
        <p>{this.state.profile.name}</p>
        <p>{this.state.profile.nickname}</p>
        <p>{this.state.profile.sub}</p>

      </div>
    );
  }
}

export default User_Profile;