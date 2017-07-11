import React, { Component } from 'react';
import NavigationBar from '../containers/navbar';
import Home from '../containers/home';


export default class App extends Component {
  render() {
    return (
      <div>
        <h3>hi</h3>
        <NavigationBar />
        <Home />
      </div>
    );
  }
}
