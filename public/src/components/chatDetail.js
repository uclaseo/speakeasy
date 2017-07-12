import React from 'react';
import { Panel } from 'react-bootstrap';

const ChatDetail = (props) => {
  
  return (
    <div>
      <Panel bsStyle="info" header={props.user}>
        {props.message}
        {props.event_id}
      </Panel>
    </div>
  )
} 

export default ChatDetail;