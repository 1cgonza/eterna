const express = require('express');
const http = require('http');

const app = express();

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
const server = http.createServer(app);
const io = require('socket.io')(server);
require('./sockets/base')(io);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

// // listen for requests :)
// const listener = app.listen(process.env.PORT, () => {
//   console.log('Your app is listening on port ' + listener.address().port);
// });

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') throw error;

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
