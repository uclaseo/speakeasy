import React, { Component } from 'react';
import Auth from '../Auth0/Auth0'
import {fetchProfile} from '../actions/authAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const auth = new Auth();

class User_Profile extends Component {
  // constructor(props) {
  //   super(props);

  // }

  // componentDidMount() {
  //   // if (!this.props.profile){
  //   // }
  //   auth.getProfile((error, profile) => {
  //     this.props.fetchProfile(profile);
  //     console.log(profile);
  //   })
  // }

  render() {
    const {profile} = this.props;
    if (!this.props.profile) {
      return <div>LOADING PROFILE</div>
    }
    return (
      <div>
         <p>name: {profile.name}</p>
        <p>nickname: {profile.nickname}</p>
        <p>sub: {profile.sub}</p> 
        <p>email: {profile.email}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
   profile: state.authReducer.profile
  }
}

export default connect(mapStateToProps, {fetchProfile})(User_Profile);


