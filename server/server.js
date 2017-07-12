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


var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack.config');

new WebpackDevServer(webpack(config), {
  contentBase: './static',
  publicPath: '/static',
  hot: true,
  inline: true,
  stats: true,
  historyApiFallback: true,
  proxy: [{
    context: ["/api"],
    target: "http://localhost:3000/"
  }]
}).listen(8080, 'localhost', function (err) {
    if (err) {
        console.log(err);
    }
 
  console.log('Listening at localhost:8080');
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../static/index.html')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use('/api', router);

app.use(express.static(path.join(__dirname, '../static')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});


init()
  .then(() => {
    
    app.listen(port, () => console.log(`app is listening on http://localhost:${port}`));
  })
  .catch(err => console.error('unable to connect to database ', err));