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
              <li> <a>  <Link to="/">Home </Link>               </a>  </li>
              <li> <a>  <Link to="/">Friends </Link>            </a>  </li>
              <li> <a>  <Link to="/temp">Direct Events </Link>      </a>  </li> 
              <li> <a>  <Link to="/">Previous Messages </Link>  </a>  </li>
              <li> <a>  <Link to="/profile">Profile </Link>            </a>  </li> 
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navigation_Bar;




