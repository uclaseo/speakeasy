import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

class Navigation_Bar extends Component {
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
              <li><Link to="/home">Home </Link></li>
              <li><Link to="/friends">Friends </Link></li>
              <li><Link to="/dm">Direct Messages </Link></li> 
              <li><Link to="/past">Previous Events </Link></li>
              <li><Link to="/profile">Profile </Link></li> 
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navigation_Bar;




