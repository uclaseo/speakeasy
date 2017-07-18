import React, { Component } from 'react'
import { Link } from 'react-router-dom'


const DMRoomDetail = ({room, handleRoomClick}) => {
  return (
    <Link to="/dm_chat">
      <li onClick={() => handleRoomClick(room)}>
        
        {room.user_to_name}
        <br></br>
        {room.dm_id}
      </li>
    </Link>
  )
}

export default DMRoomDetail