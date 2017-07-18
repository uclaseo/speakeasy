const Table = require('../models/tableModels');
const existed = {status: 'already exists'};

const env = require('../../aws.config');
const AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = 'us-west-1';
AWS.config.accessKeyId = env.AWS_ACCESS_KEY;
AWS.config.secretAccessKey = env.AWS_SECRET_ACCESS_KEY;

const getUrl = (req, res) => {

  const s3 = new AWS.S3({
    signatureVersion: 'v4'
  });
  const signedUrlList = [];
  const images = req.body;
  
  for (let image in images) {
    let s3_params = {
      Bucket: env.BUCKET,
      Key: images[image],
      Expires: 250
    };
    s3.getSignedUrl('putObject', s3_params, function(error, signedUrl) {
      if(error) {
        console.log(error);
      }
      signedUrlList.push({fileName: images[image], url: signedUrl});
    })
  }

  res.status(201).send(signedUrlList);
}

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


const screenshot = (req, res) => {


  const s3 = new AWS.S3({
    signatureVersion: 'v4'
  });
  var data = req.body.image.replace(/^data:image\/\w+;base64,/, "");
  var buf = new Buffer(data, 'base64');
  let s3_params = {
    Bucket: env.BUCKET,
    Key: req.body.fileName,
    Body: buf,
    Expires: 250
  };


s3.upload (s3_params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } if (data) {
    console.log("Upload Success", data.Location);
    res.status(201).send(data.Location);
  }
});

}

module.exports = {
  getUrl: getUrl,
  upload: upload,
  fetchEventImages: fetchEventImages,
  fetchUserEventImages: fetchUserEventImages,
  screenshot: screenshot
}