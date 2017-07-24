import React from 'react';
import { Panel } from 'react-bootstrap';

const DMDetail = ({ message }) => {

  console.log('message from dmDetail:', message);

  let nameStyle = { margin: 0, fontWeight: 'bold' }
  let msgStyle = { margin: '0 0 0 0px', fontStyle: 'italic' }

  return (
    <div id="profileform">
      <div className="my-chat-detail">
        <p style={nameStyle}>{message.user_from_name}</p>
        <p style={msgStyle}>{message.text}</p>
      </div>
    </div >
  )
}

export default DMDetail;