import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navigation_Bar from '../containers/navigation_bar';
import User_Profile from '../containers/user_profile';
import User_Events from '../containers/user_events';
import Direct_Messages from '../containers/direct_messages';
import User_Friends from '../containers/user_friends';
import Home from '../containers/home';

import Callback from '../Auth0/Callback';
import Auth from '../Auth0/Auth0';
const auth = new Auth();
const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
           <Navigation_Bar />
              <Switch>
                <Route exact path='/' exact component={Home} />
                <Route path='/profile' component={User_Profile} />
                <Route path='/past' component={User_Events} />
                <Route path='/dm' component={Direct_Messages} />
                <Route path='/friends' component={User_Friends} />
                <Route path="/callback" render={(props) => {
                   handleAuthentication(props);
                   return <Callback {...props} /> 
                 }}/>
              </Switch>
          </div>
      </BrowserRouter>
    );
  }
}
               

// App.prototype.componentWillReceiveProps = function(nextProps) {
//   let components = [];
//   function grabComponents(element) {
//     // This only works for JSX routes, adjust accordingly for plain JS config
//     if (element.props && element.props.component) {
//       components.push(element.props.component);
//     }
//     if (element.props && element.props.children) {
//       React.Children.forEach(element.props.children, grabComponents);
//     }
//   }
//   grabComponents(nextProps.routes || nextProps.children);
//   components.forEach(React.createElement); // force patching
// };



