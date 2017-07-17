import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios'

class User_Events extends Component {
  constructor(props){
    super(props)
    this.state ={
      userEvents:[]
    }
  }

  componentWillMount(){
    console.log("user id is ", this.props.profile)
    // axios.get(`/api/event/fetchuserevents/${this.props.profile.id}`)
    axios.get(`/api/event/fetchuserevents/${this.props.profile.id}`)
      .then((response)=>{
        console.log("getting stuff from user 1's events", response.data)
        this.setState ({
          userEvents: response.data,
        })
        
      })
      .catch((error)=>{
        consol.log("not getting user1's event", error);
      })
  }
  
  render() {
    return (
      <ul>
          <h3>Previous Event </h3>
          {/*{console.log("what's userID in user_events", this.props.profile.userID)}*/}
           
            {this.state.userEvents.length > 0 ? 
              this.state.userEvents.map((userEvent) =>{
                return <li>{userEvent.event.eventName} </li>
              }) : null
            }     
          
      </ul>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentLocation: state.active_event_Location,
    profile: state.profile
  }
}


export default connect(mapStateToProps)(User_Events)
