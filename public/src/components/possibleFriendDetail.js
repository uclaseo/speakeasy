import React, { Component } from 'react'
import { Link } from 'react-router-dom'


const PossibleFriendDetail = ({friend, handleFriendClick}) => {
  return (
    <Link to="/dm_chat">
      <li onClick={() => handleFriendClick(friend)}>
        
        {friend.user_to_name}
        {friend.user_to_id}
        {friend.cross_path}
      </li>
    </Link>
  )
}

export default PossibleFriendDetail