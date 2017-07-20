import React from 'react'
import { Panel } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ChatDetail = ({ message, dmClick }) => {

  if (message.images){
    return (
            <div onClick={() => {dmClick(message)}}>
        <Panel 
          bsStyle="info" 
          header={message.user_name}
        >
        
          <img className="thumbnail" src={message.images[0]}/>{message.text}
          <br></br>
          {message.event_id}
        </Panel>
      </div>

    )
  }
  return (
    // <Link to="/dm_chat">

      <div onClick={() => {dmClick(message)}}>
        <Panel 
          bsStyle="info" 
          header={message.user_name}
        >
        {message.text}
          <br></br>
          {message.event_id}
        </Panel>
      </div>
    // </Link> 
  )
} 

export default ChatDetail;