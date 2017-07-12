const express = require('express');
const bodyParser = require('body-parser');
const morgan = require ('morgan');
const path = require('path');

const router = require('./router');
const init = require('./init');
const socketEvents = require('./socket/socketEvents');
const port = 3000;

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

socketEvents(io);

// react hot loader shit
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack.config');
var compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
  hot: true,
  stats: {
    colors: true
  }
}));
app.use(require('webpack-hot-middleware')(compiler));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use('/', router);

app.use(express.static(path.join(__dirname, '../public')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/index.html'))
// })

init()
  .then(() => {
    
    app.listen(port, () => console.log(`app is listening on http://localhost:${port}`));
  })
  .catch(err => console.error('unable to connect to database ', err));