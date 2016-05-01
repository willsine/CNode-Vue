'use strict'

var http = require('http');

var proxy = require('express-http-proxy');
var express = require("express");

var app = express();

app.use(express.static(__dirname));

app.use('/api', proxy('https://cnodejs.org', {
  forwardPath: function(req, res) {
    return '/api'+req.url;
  }
}));

var port = process.env.PORT || 8080;

var server = http.createServer(app);

server.listen(port);

var onError = function(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  var bind = typeof port === 'String' ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      return process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      return process.exit(1);
    default:
      throw error;
  }
};

var onListening = function() {
  var addr, bind;
  addr = server.address();
  bind = typeof addr === 'String' ? "Pipe " + addr : "Port " + addr.port;
  return console.log("Listening on " + bind + " at " + (new Date()));
};

server.on('error', onError);

server.on('listening', onListening);