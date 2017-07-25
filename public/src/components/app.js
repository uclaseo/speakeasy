import React, { Component } from 'react';
import { Redirect, BrowserRouter, Route, Switch } from 'react-router-dom';
import Callback from '../Auth0/Callback';
import Auth from '../Auth0/Auth0';

import Navigation_Bar from '../containers/navigation_bar';
import User_Profile from '../containers/user_profile';
import User_Events from '../containers/user_events';
import DirectMessageList from '../containers/directMessageList';
import PossibleFriendsList from '../containers/possibleFriendsList';
import Home from '../containers/home';
import Event_Setting from '../containers/event_setting';
import EventChat from '../containers/eventChat';
import Landing_Page from '../containers/landing_page';
import DMChat from '../containers/dmChat';
import previousEventPhotos from '../containers/previousEventPhotos';

const auth = new Auth();
const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

function protectPath(comp) {
  return;
  props => !auth.isAuthenticated()
    ? <Redirect to="/" />
    : <comp auth={auth} {...props} />;
}

function renderNavBar() {
  return ((auth.isAuthenticated())
    ? <div><Navigation_Bar /></div>
    : <div className="navbar"></div>);
}

function renderFooter() {
  return (
    <footer className="col-lg-8 col-lg-offset-2 text-center">
      <p>
        Created by JMNI at Hack Reactor</p>
    </footer>
  )
}

export default class App extends Component {
  render() {
    return (
      <div id="page-top" data-spy="scroll" data-target=".navbar-fixed-top">
        <BrowserRouter>
          <div>
            {renderNavBar()}
            <Switch>
              <Route
                exact
                path="/"
                render={props => {
                  return <Landing_Page {...props} />;
                }} />
              <Route
                exact
                path="/callback"
                render={props => {
                  handleAuthentication(props);
                  return <Callback {...props} />;
                }} />
              <Route
                path="/home"
                render={props => !auth.isAuthenticated()
                  ? <Redirect to="/" />
                  : <Home auth={auth} {...props} />} />
              <Route
                path="/friends"
                render={props => !auth.isAuthenticated()
                  ? <Redirect to="/" />
                  : <PossibleFriendsList auth={auth} {...props} />} />
              <Route
                path="/dm"
                render={props => !auth.isAuthenticated()
                  ? <Redirect to="/" />
                  : <DirectMessageList auth={auth} {...props} />} />
              <Route
                path="/past"
                render={props => !auth.isAuthenticated()
                  ? <Redirect to="/" />
                  : <User_Events auth={auth} {...props} />} />

              <Route
                path="/profile"
                render={props => !auth.isAuthenticated()
                  ? <Redirect to="/" />
                  : <User_Profile auth={auth} {...props} />} />
              <Route
                path="/event_setting"
                render={props => !auth.isAuthenticated()
                  ? <Redirect to="/" />
                  : <Event_Setting auth={auth} {...props} />} />
              <Route
                path="/active_event"
                render={props => !auth.isAuthenticated()
                  ? <Redirect to="/" />
                  : <EventChat auth={auth} {...props} />} />
              <Route path='/dm_chat' component={DMChat} />
              <Route
                  path="/previouseventphotos"
                  component={previousEventPhotos}
              />
            </Switch>
          </div>
        </BrowserRouter>

        {renderFooter()}

      </div>
    );
  }
}
