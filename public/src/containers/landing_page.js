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
    this.login = this
      .login
      .bind(this);
  }

  login() {
    console.log('clicked login');
    auth.login();
  }

  render() {
    return (
      <div>
        <header className="intro">
          <div className="intro-body">
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2">
                  <h1 className="brand-heading">SPEAKEASY</h1>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section>
          <div className="container content-section text-center">
            <div className="row">
              <div className="col-lg-8 col-lg-offset-2">
                <p>
                  DIY semiotics succulents, put a bird on it tattooed hoodie +1 letterpress woke.
              Umami knausgaard hexagon tumblr. Polaroid disrupt sartorial cliche prism retro
              cray bespoke. Authentic salvia kitsch twee literally. Kinfolk locavore YOLO twee
              PBR&B shoreditch echo park. Selfies ugh godard actually, biodiesel cliche pop-up
              jianbing vape mumblecore tacos chia tote bag taiyaki.
                </p>
              </div>
              <div className="container text-center row col-md-8 col-md-offset-2">
                <Link to="/" onClick={this.login} className="btnghost">
                  <i className="fa"></i>
                  Join the Conversation
          </Link>
              </div>


            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default connect(null, null)(Landing_Page);


