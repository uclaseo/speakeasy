import React, { Component } from 'react';

import Landing_Page from '../containers/landing_page';
import Home from '../containers/home';
import Event_Setting from '../containers/event_setting';
import EventChat from '../containers/eventChat';
import OpenEventsList from '../containers/openEvents';
import User_Events from '../containers/user_events';
import DirectMessageList from '../containers/directMessageList';
import DMChat from '../containers/dmChat';
import User_Friends from '../containers/user_friends';
import User_Profile from '../containers/user_profile';
import Chat from '../components/chat';
import Upload_Template from '../containers/upload_template';


export default class Frontend_Routes extends Component {
  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={props => {
            return <Landing_Page {...props} />;
          }}
        />
        <Route
          exact
          path="/callback"
          render={props => {
            handleAuthentication(props);
            return <Callback {...props} />;
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
              : <DirectMessageList auth={auth} {...props} />}
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
              : <EventChat auth={auth} {...props} />}
        />
        <Route
          path="/open_events"
          render={props =>
            !auth.isAuthenticated()
              ? <Redirect to="/" />
              : <OpenEventsList auth={auth} {...props} />}
        />
        <Route
          path="/upload"
          render={props =>
            !auth.isAuthenticated()
              ? <Redirect to="/" />
              : <Upload_Template auth={auth} {...props} />}
        />

        <Route
          path="/dm_chat"
          render={props =>
            !auth.isAuthenticated()
              ? <Redirect to="/" />
              : <DMChat auth={auth} {...props} />}
        />
      </div>
    )}};