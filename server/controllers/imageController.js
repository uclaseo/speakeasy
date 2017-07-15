const Table = require('../models/tableModels');
const existed = {status: 'already exists'};

const env = require('../../aws.config');
const AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = 'us-west-1';
AWS.config.accessKeyId = env.AWS_ACCESS_KEY;
AWS.config.secretAccessKey = env.AWS_SECRET_ACCESS_KEY;

const getUrl = (req, res) => {

  var s3 = new AWS.S3({
    signatureVersion: 'v4'
  });
  var s3_params = {
    Bucket: env.BUCKET,
    Key: req.body[0],
    Expires: 250
  }

  s3.getSignedUrl('putObject', s3_params, function(error, signedUrl) {
    if(error) {
      console.log(error);
    }
    res.send(signedUrl);
  })
};

const upload = (req, res) => {
  Table.Image.findOrCreate({
    where: {
      name: req.body.name,
      imageLink: req.body.imageLink,
      userId: req.body.userId,
      eventId: req.body.eventId
    }
  })
  .then((response) => {
    res.status(201).send(response);
  })
  .catch((error) => {
    console.log('ERRRROR', error);
    res.send(error);
  })
}




const fetchEventImages = (req, res) => {
  Table.Image.findAll({
    where: {
      eventId: req.params.eventId
    },
    include: [
      {
        model: Table.User
      }
    ]
  })
  .then((response) => {
    res.status(200).send(response);
  })
  .catch((error) => {
    res.send(error);
  });
};

const fetchUserEventImages = (req, res) => {
  Table.Image.findAll({
    where: {
      userId: req.params.userId,
      eventId: req.params.eventId
    }
  })
  .then((response) => {
    res.status(200).send(response);
  })
  .catch((error) => {
    res.send(error);
  })
}


module.exports = {
  getUrl: getUrl,
  upload: upload,
  fetchEventImages: fetchEventImages,
  fetchUserEventImages: fetchUserEventImages
}