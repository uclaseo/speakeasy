import React from 'react'
import { Panel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import _ from 'lodash'

const ChatDetail = ({ message, dmClick }) => {
  console.log("message::", message);
  // if (message.images) {
  //   return (
  //     <div onClick={() => { dmClick(message) }}>
  //       <Panel
  //         bsStyle="info"
  //         header={message.user_name}
  //       >
  //         {_.map(message.images, (image) => {
  //           return <img className="thumbnail" src={image} />
  //         })}
  //         {message.text}

  if (message.images) {
    return (
            <div onClick={() => {dmClick(message)}}>
        <Panel 
          bsStyle="info" 
          header={message.user_name}
        >
          {_.map(message.images, (image)=>{
            return <img className="thumb" src={image}/>
          })}
        {message.text}
           <br></br>
           {message.event_id}
         </Panel>
       </div>
    )
  }

  let nameStyle = { margin: 0, fontWeight: 'bold' }
  let msgStyle = { margin: '0 0 0 0px', fontStyle: 'italic' }

  return (
    <div id="profileform">
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