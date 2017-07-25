import React, { Component } from 'react'
import { Link } from 'react-router-dom'


const NearbyEventDetail = ({ event, handleEventClick, idx }) => {
  
  return (
      <div className="gallery" >
        <Link to="/active_event" onClick={() => handleEventClick(event)}>
            <ul>
              <li>
                <img 
                  src={event.eventPhoto || "https://ak5.picdn.net/shutterstock/videos/22434133/thumb/1.jpg"}  
                />
                <div className="text-center">
                  <p>
                    {event.eventName}
                  </p>
                </div>
              </li>
            </ul>
        </Link>
    </div>
  )
}

export default NearbyEventDetail

//<img src={`http://unsplash.it/680/380?random=${idx}`} alt="" />
