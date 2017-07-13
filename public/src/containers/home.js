import React, { Component } from 'react';
import Auth from '../Auth0/Auth0';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchProfile} from '../actions/authAction';

const auth = new Auth();

class Home extends Component {

  componentDidMount() {
    auth.getProfile((error, profile) => {
      this.props.fetchProfile(profile);
      console.log(profile);
    });
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
              <img src="https://placehold.it/150x80?text=IMAGE" className="img-responsive" style={{width: '100%'}} alt="Image" />
            </div>
            <div className="col-sm-3"> 
              <p>Some event..</p>
              <img src="https://placehold.it/150x80?text=IMAGE" className="img-responsive" style={{width: '100%'}} alt="Image" />
            </div>
            <div className="col-sm-3"> 
              <p>Some event...</p>
              <img src="https://placehold.it/150x80?text=IMAGE" className="img-responsive" style={{width: '100%'}} alt="Image" />
            </div>
            <div className="col-sm-3">
              <p>Some event...</p>
              <img src="https://placehold.it/150x80?text=IMAGE" className="img-responsive" style={{width: '100%'}} alt="Image" />
            </div>
          </div>
          <br />
          <br />
        <button type="button" className="btn btn-secondary btn-lg">Create Event</button>
        </div>




      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    profile: state.authReducer.profile
  };
}

export default connect(mapStateToProps, {fetchProfile})(Home);
