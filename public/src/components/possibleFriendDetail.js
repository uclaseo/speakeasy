import React, { Component } from 'react'
import { Link } from 'react-router-dom'


const PossibleFriendDetail = ({friend, handleFriendClick}) => {
  return (
      <li onClick={() => handleFriendClick(friend)}>
        {friend.user_to_name}
        {friend.user_to_id}
        {friend.cross_path}
      </li>
  )
}

export default PossibleFriendDetail