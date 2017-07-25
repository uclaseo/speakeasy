import React from 'react'
import { Panel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import _ from 'lodash'

const ChatDetail = ({ message, dmClick }) => {

  if (message.images) {
    return (
            <div onClick={() => {dmClick(message)}}>
        <Panel 
          bsStyle="info" 
          header={message.user_name}
        >
          {_.map(message.images, (image)=>{
            return <img className="thumb" src={image}/>
          })}
        {message.text}

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