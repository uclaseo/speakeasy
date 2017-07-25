import React from 'react'
import { Panel } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ChatDetail = ({ message, dmClick }) => {
  let nameStyle = { margin: 0, fontWeight: 'bold' }
  let msgStyle = { margin: '0 0 0 0px', fontStyle: 'italic' }

  return (
    <div id="contactform">
      <Link to="/dm_chat">
        <div className="my-chat-detail" onClick={() => { dmClick(message) }}>
          <p style={nameStyle}>{message.user_name}</p>
          <p style={msgStyle}>{message.text}</p>
        </div>
      </Link>
    </div >
  )
}

export default ChatDetail;