import React from 'react'
import { Panel } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ChatDetail = ({ message, dmClick }) => {
  
  return (
    // <Link to="/dm_chat">
      <div onClick={() => {dmClick(message)}}>
        <Panel 
          bsStyle="info" 
          header={message.user_name}
        >
          <img className="thumbnail" src={message.imageUrl}/>{message.text}
          <br></br>
          {message.event_id}
        </Panel>
      </div>
    // </Link> 
  )
} 

export default ChatDetail;