import React, { Component } from 'react'
import { Link } from 'react-router-dom'


const NearbyEventDetail = ({ event, handleEventClick }) => {
  console.log('nearby event detail ', event);
  return (
    <Link to="/active_event" onClick={() => handleEventClick(event)}>
      <li >
        
        {event.eventName}
        {event.id}
      </li>
    </Link>
  )
}

export default NearbyEventDetail