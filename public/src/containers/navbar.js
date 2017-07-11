import React, { Component } from 'react';

class NavigationBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span> 
            </button>
            <a className="navbar-brand" href="#">Speakeasy</a>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#">Home</a></li>
              <li><a href="#">Friends</a></li>
              <li><a href="#">Direct Messages</a></li> 
              <li><a href="#">Previous Messages</a></li>
              <li><a href="#">Profile</a></li> 
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavigationBar;




