import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {geolocated} from 'react-geolocated';
import {setCurrentEventLocation} from '../actions/index.js'
 

class UserLocation extends React.Component {
  constructor(props){
    super(props)
    // console.log("setCurrentEventLocation in Demo constructor", setCurrentEventLocation);

  }

  shouldComponentUpdate(nextProps, nextState){
    // console.log('next props', nextProps)
    // console.log('props in should component update', this.props)
    // console.log('next state', nextState)
    // console.log("is this.props.coords true?", this.props.coords)
    if (this.props.coords !== null) {
      // console.log("this.props.coords.lat", this.props.coords.lat)
      // console.log('nextprops coords lat', nextProps.coords.latitude)
      // console.log('comparison', this.props.coords.lat === nextProps.coords.latitude)
      if (this.props.coords.latitude === nextProps.coords.latitude && this.props.coords.longitude === nextProps.coords.longitude) {
        // console.log('inside of if block')
        return false
      }
    }
    
    this.props.setCurrentEventLocation({lat:nextProps.coords.latitude,lng:nextProps.coords.longitude})
    return true
  }

 

  render() {
    // {console.log("props in Demo", this.props)}
    return !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
          ? <table>
            <tbody>
              {/* {console.log('inside of body with props', this.props)} */}
              <tr><td>latitude</td><td>{this.props.coords.latitude}</td></tr>
              <tr><td>longitude</td><td>{this.props.coords.longitude}</td></tr>
            </tbody>
          </table>
          : <div>Getting the location data&hellip; </div>;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setCurrentEventLocation}, dispatch)
}


export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(connect(mapDispatchToProps,{setCurrentEventLocation})(UserLocation));