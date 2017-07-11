import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './src/components/app';
import rootReducer from './src/reducers/index';
import { BrowserRouter, Route } from 'react-router-dom';
import NavigationBar from './src/containers/navbar';
import Home from './src/containers/home';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <BrowserRouter>
    <div>
     <NavigationBar />
      <Route path="/" component={Home}></Route>

    </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


// <Route path="" component={}></Route>