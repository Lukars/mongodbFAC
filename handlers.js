var handlers = {};
var fs = require('fs');
var index = fs.readFileSync(__dirname + '/index.html');
var mongo = require("./mongo.js");

// handlers["GET "] = function (req, res) {
//   res.writeHead(200, {"Content-Type": "text/html"});
//   res.end(index.toString());
// };

handlers["POST create"] = function (req, res) {
  var newEntry = "";
  req.on("data", function(chunk){
    newEntry += chunk;
    console.log("new entry: ", newEntry);
  });
  req.on("end", function() {
    mongo.insert([JSON.parse(newEntry)], function(results){
    console.log("entry added to database", results);
    res.end();
  });
});
};

handlers["GET read"] = function (req, res) {
  var personName = req.url.split('&')[1] || undefined;
  if(personName) {
    mongo.read({name: personName}, function(results){
      res.end(JSON.stringify(results));
      // res.end();
    });
  } else {
    res.write("No name specified");
    res.end();
  }
};

handlers["POST delete"] = function (req, res) {
  var entry;
  req.on("data", function(chunk){
    entry = chunk + '';
  });
  mongo.deleter({name: entry}, function(err, results) {
    console.log("result deleted: ", results);
    res.end();
  });
};

handlers.generic = function(req, res) {
  fs.readFile(__dirname + req.url, function(err, data){
    if (err){
      res.end();
    }
    else {
      var ext = req.url.split('.')[1];
      console.log("extension:" + ext);
      res.writeHead(200, {'Content-Type' : 'text/' + ext});
      res.end(data);
    }
  });
};

module.exports = handlers;
