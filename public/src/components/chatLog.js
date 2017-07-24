import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import ChatDetail from './chatDetail';


const ChatLog = ({ roomMessages, dmClick }) => {
  const messages = roomMessages.map((message) => {
    return (
      <ChatDetail
        message={message}
        key={message._id}
        dmClick={dmClick}
      />)
  })

  return (
    <Grid>
      <Col xs={8} xs={8}>
        {messages}
      </Col>
    </Grid>
  )
}

export default ChatLog;