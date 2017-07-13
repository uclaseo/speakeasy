const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const router = require('./router');
const init = require('./init');
const socketEvents = require('./socket/socketEvents');
const port = 3000;
const app = express();
const server = require('http').Server(app);
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config');

server.listen(3000, '127.0.0.1');
const io = require('socket.io')(server);
socketEvents(io);

new WebpackDevServer(webpack(config), {
  contentBase: './static',
  publicPath: '/static',
  hot: true,
  inline: true,
  stats: true,
  historyApiFallback: true,
  proxy: [
    {
      context: ['/api', '/sock'],
      target: 'http://localhost:3000/',
      changeOrigin: true
    }
  ],
  headers: { 'Access-Control-Allow-Origin': '*' }
}).listen(8080, 'localhost', function(err) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:8080');
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
// app.use(cors());
app.use(express.static(path.join(__dirname, '../static')));
app.use('/api', router);
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../static/index.html'))
);
init()
  .then(() => {
    app.listen(port, () =>
      console.log(`app is listening on http://localhost:${port}`)
    );
  })
  .catch(err => console.error('unable to connect to database ', err));
