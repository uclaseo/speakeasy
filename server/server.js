const express = require('express');
const bodyParser = require('body-parser');
const morgan = require ('morgan');
const path = require('path');

const router = require('./router');
const init = require('./init');
const port = 3000;


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use('/', router);

app.use(express.static(path.join(__dirname, '../public')));
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

init()
  .then(() => {
    app.listen(port, () => console.log(`app is listening on port ${port}`));
  })
  .catch(err => console.error('unable to connect to database ', err));