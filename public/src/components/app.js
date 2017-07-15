import React, { Component } from 'react';
import { Redirect, BrowserRouter, Route, Switch } from 'react-router-dom';
import Callback from '../Auth0/Callback';
import Auth from '../Auth0/Auth0';

import Navigation_Bar from '../containers/navigation_bar';
import User_Profile from '../containers/user_profile';
import User_Events from '../containers/user_events';
import Direct_Messages from '../containers/direct_messages';
import User_Friends from '../containers/user_friends';
import Home from '../containers/home';
import Event_Setting from '../containers/event_setting';
import Event_Chat from '../containers/eventChat';
import Landing_Page from '../containers/landing_page';
import Chat from '../components/chat';

const auth = new Auth();
const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

function protectPath(comp) {
  return;
  props =>
    !auth.isAuthenticated()
      ? <Redirect to="/" />
      : <comp auth={auth} {...props} />;
}

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation_Bar />

          <Switch>
            <Route
              exact
              path="/"
              render={props => {
                handleAuthentication(props);
                return <Landing_Page {...props} />;
              }}
            />
            <Route
              path="/home"
              render={props =>
                !auth.isAuthenticated()
                  ? <Redirect to="/" />
                  : <Home auth={auth} {...props} />}
            />
            <Route
              path="/friends"
              render={props =>
                !auth.isAuthenticated()
                  ? <Redirect to="/" />
                  : <User_Friends auth={auth} {...props} />}
            />
            <Route
              path="/dm"
              render={props =>
                !auth.isAuthenticated()
                  ? <Redirect to="/" />
                  : <Direct_Messages auth={auth} {...props} />}
            />
            <Route
              path="/past"
              render={props =>
                !auth.isAuthenticated()
                  ? <Redirect to="/" />
                  : <User_Events auth={auth} {...props} />}
            />
            <Route
              path="/friends"
              render={props =>
                !auth.isAuthenticated()
                  ? <Redirect to="/" />
                  : <User_Profile auth={auth} {...props} />}
            />
            <Route
              path="/profile"
              render={props =>
                !auth.isAuthenticated()
                  ? <Redirect to="/" />
                  : <User_Profile auth={auth} {...props} />}
            />
            <Route
              path="/event_setting"
              render={props =>
                !auth.isAuthenticated()
                  ? <Redirect to="/" />
                  : <Event_Setting auth={auth} {...props} />}
            />
            <Route
              path="/active_event"
              render={props =>
                !auth.isAuthenticated()
                  ? <Redirect to="/" />
                  : <Event_Chat auth={auth} {...props} />}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
