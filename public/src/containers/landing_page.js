import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import Auth from '../Auth0/Auth0';

const auth = new Auth();
const { isAuthenticated } = auth;

class Landing_Page extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login() {
    console.log('clicked login');
    auth.login();
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <div className="container text-center">
            <h1>Speakeasy</h1>
            <h2>Landing Page</h2>
          </div>
        </div>
        <div className="container text-center">
          <p>
            DIY semiotics succulents, put a bird on it tattooed hoodie +1
            letterpress woke. Umami knausgaard hexagon tumblr. Polaroid disrupt
            sartorial cliche prism retro cray bespoke. Authentic salvia kitsch
            twee literally. Kinfolk locavore YOLO twee PBR&B shoreditch echo
            park. Selfies ugh godard actually, biodiesel cliche pop-up jianbing
            vape mumblecore tacos chia tote bag taiyaki.{' '}
          </p>
        </div>
        <br />
        <Link to="/" onClick={this.login} className="center-block">
          <button
            type="button"
            className="btn btn-secondary btn-lg center-block"
          >
            Join
          </button>
        </Link>
      </div>
    );
  }
}

export default connect(null, null)(Landing_Page);

// <li><Link onClick={this.login} to="/">Login</Link></li>
// <li><Link onClick={this.logout} to="/">Logout</Link></li>
