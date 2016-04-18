var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var handle = {};

handle["/getFiles"] = requestHandlers.getFiles;

server.start(router.route, handle);

