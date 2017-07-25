import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import ChatDetail from './chatDetail';


const ChatLog = ({ roomMessages, dmClick, enterText }) => {
  const messages = roomMessages.map((message) => {
    return (
      <div key={message._id}>
        <ChatDetail
          message={message}
          dmClick={dmClick}
        />
      </div >
    )
  })

  return (
    <div className="my-log">
      <ul>
      <Grid>
        <Col>
          {messages}
        </Col>
      </Grid>
      </ul>
    </div>
  )
}

export default ChatLog;