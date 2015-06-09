var handlers = require('./handlers.js');
var fs = require('fs');

function serverHandlers(req, res) {
  var route = req.method + " " + req.url.split('/')[0];
  console.log(route);
  if (handlers[route]) {
    handlers[route](req, res);
  }
  else {
    handlers.generic(req, res);
  }
}

module.exports = serverHandlers;
