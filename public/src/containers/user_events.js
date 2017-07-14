import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

class User_Events extends Component {
  constructor(props){
    super(props)
    this.state ={
      userEvents:[]
    }
  }

  componentWillMount(){
    axios.get('/api/event/fetchuserevents/1')
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
          {/*{console.log("what's userID in user_events", this.props.profile.userID)}*/}
          {console.log("userEvents", this.state.userEvents)}
          {this.state.userEvents ? this.state.userEvents.map((userEvent) =>{
            return <li>{userEvent.event.eventName} </li>
          }) : null}
          {/*{this.state.userEvents[0].eventName}*/}
          {/*{console.log("userEvents",this.state.userEvents[0])}*/}
      </ul>
      
    );
  }
}

export default User_Events;

{/*<li><Link onClick={this.login} to="/">Login</Link></li>*/}