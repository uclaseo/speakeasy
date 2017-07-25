import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import DMDetail from './dmDetail';


const DMLog = ({ directMessages }) => {
  const messages = directMessages.map((message) => {
    return (
      <div key={message._id}>
        <DMDetail
          message={message}
          key={message._id}
        />
      </div>
    )
  })

  return (
    <div>
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

export default DMLog;