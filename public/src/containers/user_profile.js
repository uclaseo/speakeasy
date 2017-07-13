import React, { Component } from 'react';
import Auth from '../Auth0/Auth0'
import {fetchProfile} from '../actions/authAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const auth = new Auth();

class User_Profile extends Component {
  constructor(props) {
    super(props);

    // this.getProfile = this.getProfile.bind(this);
  }

  componentDidMount() {
    if (!this.props.profile){
      console.log('no profile')
    }
    auth.getProfile((error, profile) => {
      this.props.fetchProfile(profile);
    })

    // this.setState({ 
    //    profile: {} 
    // });
    // const { userProfile, getProfile } = auth;
    // if (!userProfile) {
    //   this.props.fetchProfile((err, profile) => {
    //     this.setState({ profile });
    //   });
    // } else {
    //   this.setState({ profile: userProfile });
    // }
  }

  render() {
    // if (!this.state.profile) {
    //   return <div>LOADING</div>
    // }

    const {profile} = this.props;
    console.log('profile in container', profile);
    console.log('props in container', this.props);
    if (!this.props.profile) {
      return <div>LOADING PROFILE</div>
    }
    return (
      <div>
         <p>name: {profile.name}</p>
        <p>nickname: {profile.nickname}</p>
        <p>sub: {profile.sub}</p> 
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
   profile: state.authReducer.profile
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({fetchProfile: fetchProfile}, dispatch);
// };

export default connect(mapStateToProps, {fetchProfile})(User_Profile);


