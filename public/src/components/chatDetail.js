import React from 'react'
import { Panel } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ChatDetail = ({ message, dmClick }) => {
  
  return (
    <Link to="/dm">
      <div onClick={() => {dmClick(message.user_id)}}>
        <Panel 
          bsStyle="info" 
          header={message.user_name}
        >
          {message.text}
          <br></br>
          {message.event_id}
        </Panel>
      </div>
    </Link> 
  )
} 

export default ChatDetail;