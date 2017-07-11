import React, { Component } from 'react';
import NavigationBar from '../containers/navbar';
import Home from '../containers/home';


export default class App extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <Home />
      </div>
    );
  }
}
