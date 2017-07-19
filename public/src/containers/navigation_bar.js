import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../Auth0/Auth0';
const auth = new Auth();
const { isAuthenticated } = auth;

class Navigation_Bar extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    auth.logout();
  }

  
  render() {
    
    return (
      <div id="page-top" data-spy="scroll" data-target=".navbar-fixed-top">
        <nav className="navbar navbar-custom navbar-fixed-top" role="navigation">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-main-collapse">
                <i className="fa fa-bars"></i>
                </button>
              {/* <a className="navbar-brand page-scroll" href="index.html">
                SPEAKEASY</a> */}
            </div>
            <div className="collapse navbar-collapse navbar-right navbar-main-collapse">

              <ul className="nav navbar-nav">
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/friends">Friends</Link>
                </li>
                <li>
                  <Link to="/dm">Direct Messages</Link>
                </li>
                <li>
                  <Link to="/past">Previous Events</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link onClick={this.logout} to="/">Logout</Link>
                </li>
                <li>
                  <Link to="/upload">UPLOAD</Link>
                </li>
              </ul>

            </div>
          </div>
        </nav>
      </div>
    );
  }
}




export default Navigation_Bar;


