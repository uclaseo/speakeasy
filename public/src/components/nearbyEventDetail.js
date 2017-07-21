import React, { Component } from 'react'
import { Link } from 'react-router-dom'


const NearbyEventDetail = ({ event, handleEventClick, idx }) => {

  return (
    <div className="event-detail">
      <Link to="/active_event" onClick={() => handleEventClick(event)}>
        <li className="col-md-3">
          <img src={`http://unsplash.it/680/380?random=${idx}`} alt="" />
          <div className="text-center">
            <p>
              {event.eventName}
            </p>
          </div>
        </li>
      </Link>
    </div>
  )
}

export default NearbyEventDetail