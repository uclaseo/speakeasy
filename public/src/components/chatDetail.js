import React from 'react';
import { Panel } from 'react-bootstrap';

const ChatDetail = ({ message, dmClick }) => {
  
  return (
    <div>
      <Panel 
        bsStyle="info" 
        header={message.user_name}
        onClick={dmClick(user)}
      >
        {message.text}
        <br></br>
        {message.event_id}
      </Panel>
    </div>
  )
} 

export default ChatDetail;