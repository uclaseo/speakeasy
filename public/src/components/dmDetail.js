import React from 'react';
import { Panel } from 'react-bootstrap';

const DMDetail = ({message}) => {
  
  return (
    <div>
      <Panel bsStyle="info" header={message.user_from_name}>
        {message.text}
        <br></br>
        {message.dm_id}
      </Panel>
    </div>
  )
} 

export default DMDetail;