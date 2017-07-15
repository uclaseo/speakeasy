import React, { Component } from 'react'
import { Link } from 'react-router-dom'


const OpenEventDetail = ({event, eventClick}) => {
  return (
    <Link to="/active_event">
      <li onClick={() => eventClick(event)}>
        
        {event.eventName}
        {event.id}
      </li>
    </Link>
  )
}

export default OpenEventDetail