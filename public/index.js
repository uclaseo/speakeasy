import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './src/components/app';
import rootReducer from './src/reducers/index';
import { BrowserRouter, Route } from 'react-router-dom';
import Navigation_Bar from './src/containers/navigation_bar';
import Home from './src/containers/home';
import User_Profile from './src/containers/user_profile';

const createStoreWithMiddleware = applyMiddleware()(createStore);

//DELETE THIS LATER
class Temporary extends React.Component {
  render() { return(<div>HELLO THIS IS TEMPORARY</div>) }
}

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <BrowserRouter>
    <div>
       <Navigation_Bar />
        <Route exact path="/" component={Home} />
        <Route path="/temp" component={Temporary} />

      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


