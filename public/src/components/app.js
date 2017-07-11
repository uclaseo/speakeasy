import React, { Component } from 'react';
import NavigationBar from '../containers/navigation_bar';
import Home from '../containers/home';


export default class App extends Component {
  render() {
    return (
      <div>
        <Navigation_Bar />
        <Home />
      </div>
    );
  }
}
