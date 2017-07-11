import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './src/components/app';
import rootReducer from './src/reducers/index';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navigation_Bar from './src/containers/navigation_bar';
import User_Profile from './src/containers/user_profile';
import User_Events from './src/containers/user_events';
import Direct_Messages from './src/containers/direct_messages';
import User_Friends from './src/containers/user_friends';
import Home from './src/containers/home';


const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <BrowserRouter>
    <div>
       <Navigation_Bar />
    <Switch>
        <Route path='/profile' component={User_Profile} />
        <Route path='/past' component={User_Events} />
        <Route path='/dm' component={Direct_Messages} />
        <Route path='/friends' component={User_Friends} />
        <Route path='/home' component={Home} />
        <Route exact path='/' component={Home} />
    </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);