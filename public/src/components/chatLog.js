import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import ChatDetail from './chatDetail';

const ChatLog = (props) => {
  const messages = props.messages.map((message) => {
    return (<ChatDetail 
              user_name={message.user_name} 
              message={message.text} 
              event_id={message.event_id} 
            />)
  })

  return (
    <div>
      <Grid>
        <Col xs={8} xs={8}>
          {messages}
        </Col>
      </Grid>
    </div>
  )
}

export default ChatLog;