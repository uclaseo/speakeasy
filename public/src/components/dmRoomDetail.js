import React, { Component } from 'react'
import { Link } from 'react-router-dom'


const DMRoomDetail = ({room, handleRoomClick}) => {
  return (
      <li onClick={() => handleRoomClick(room)}>
        
        {room.user_to_name}
        <br></br>
        {room.dm_id}
      </li>
  )
}

export default DMRoomDetail