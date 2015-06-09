var http = require("http");
var serverHandlers = require("./serverHandlers.js");

http.createServer(serverHandlers).listen(3000);
