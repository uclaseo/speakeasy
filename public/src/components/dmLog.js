import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import DMDetail from './dmDetail';


const DMLog = ({ directMessages }) => {
  const messages = directMessages.map((message) => {
    return (
      <DMDetail
        message={message}
        key={message._id}
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

export default DMLog;