import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import DMDetail from './dmDetail';


const DMLog = ({ directMessages }) => {
  const messages = directMessages.map((message) => {
    return (
      <div key={message._id}>
        <DMDetail
          message={message}
        />
      </div>
    )
  })

  return (
    <div>
      <Grid>
        <Col>
          {messages}
        </Col>
      </Grid>
    </div>
  )
}

export default DMLog;