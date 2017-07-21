const mongoose = require('mongoose');
const Message = require('./../models/messageModel');
const DirectMessage = require('./../models/dmModel');

module.exports = {

  fetchMessagesForEvent: (req, res) => {
    Message
      .find({ event_id: req.params.eventId })
      .select('createdAt text user_name user_id images')
      .sort('-createdAt')
      .exec((err, messages) => {
        if (err) console.error('error fetching messages ', err)
        res.json({
          success: true,
          response: 'fetching messages',
          messages: messages
        });
      })
  },

  postMessageToEvent: (req, res) => {
    const { user_name, text, user_id } = req.body;
    if (!text) {
      res.status(400).send({ error: 'No message included'});
    }
    const newMessage = new Message({
      user_name: user_name,
      user_id: user_id,
      event_id: req.body.eventId,
      text: text
    });
    newMessage.save((err, message) => {
      if (err) console.error('error posting a message ', err)
      res.json({
        success: true,
        response: 'message created',
        message: message
      });
    })
  },

  fetchDirectMessages: (req, res) => {
    DirectMessage
      .find({ dm_id: req.params.dmId })
      .exec((err, messages) => {
        if (err) console.error('error fetching direct messages ', err)
        res.json({
          success: true, 
          response: 'fetching direct messages',
          messages: messages });
      })
  },

  postDirectMessage: (req, res) => {
    let { user_from_name, user_to_name, text } = req.body;
    let newDM = new DirectMessage({
      dm_id: req.body.dm_id,
      user_from_name: user_from_name,
      user_to_name: user_to_name,
      text: text
    });
    newDM.save((err, message) => {
      if (err) console.error('error posting a direct message ', err)
      res.json({
        success: true,
        response: 'direct message posted',
        message: message
      })
    })
  },

  fetchAllDirectMessages: (req, res) => {
    DirectMessage
      .find()
      .exec((err, messages) => {
        if (err) console.error('error fetching all dms ', err);
        res.json({
          success: true,
          response: 'fetching all',
          messages: messages
        })
      })
  }
}