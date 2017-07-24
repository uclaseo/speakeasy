import React, { Component } from 'react'
import { Link } from 'react-router-dom'


const DMRoomDetail = ({ room, handleRoomClick }) => {
  return (

      <div className="my-list" onClick={() => handleRoomClick(room)}>
        <li>
          {room.user_to_name}
        </li>
        <br></br>
      </div>

  )
}

export default DMRoomDetail