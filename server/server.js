const express = require('express');
const bodyParser = require('body-parser');
const morgan = require ('morgan');
const path = require('path');



const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/', router);

app.use(express.static(path.join(__dirname, '../')));


init()
  .then(() => {
    server.listen(port, () => console.log(`app is listening on port ${port}`));
  })
  .catch(err => console.error('unable to connect to database ', err));