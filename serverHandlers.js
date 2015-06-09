var handlers = require('./handlers.js');
var fs = require('fs');
var index = fs.readFileSync(__dirname + '/index.html');

function serverHandlers(req, res) {
  var route = req.method + " " + req.url.split('/')[1];
  if (route.indexOf('&') > -1) {
    route = route.split('&')[0];
  }
  console.log(route);
  if (req.url.length === 1) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(index.toString());
    res.end();
  }
  else if (req.url.indexOf(".") > -1){
    handlers.generic(req, res);
  }
  else {
    handlers[route](req, res);
  }
}

module.exports = serverHandlers;
