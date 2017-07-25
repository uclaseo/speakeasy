import React from 'react'
import { Panel } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ChatDetail = ({ message, dmClick }) => {
  let nameStyle = { margin: 0, fontWeight: 'bold' }
  let msgStyle = { margin: '0 0 0 0px', fontStyle: 'italic' }

  return (
    <div id="contactform">
        <div className="my-chat-detail" onClick={() => { dmClick(message) }}>
          <p style={nameStyle}>{message.user_name}</p>
          <p style={msgStyle}>{message.text}</p>
          <p>
            <div className="gallery">
              {message.images ? <img src={message.images[0]} /> : null}
            </div>
          </p>
        </div>
    </div >
  )
}

export default ChatDetail;