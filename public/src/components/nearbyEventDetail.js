import React, { Component } from 'react'
import { Link } from 'react-router-dom'


const NearbyEventDetail = ({ event, handleEventClick }) => {
  return (
    <div>
      
      <Link to="/active_event" onClick={() => handleEventClick(event)}>
        <li >
          {event.eventName}
          {event.id}
          <img src = {event.eventPhoto}/>
        </li>
      </Link>
    </div>
  )
}

export default NearbyEventDetail