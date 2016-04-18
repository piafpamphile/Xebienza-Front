var http = require("http");
var url = require("url");
var port = process.env.PORT || 8888;

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Requête reçue pour le chemin " + pathname + ".");
    route(handle, pathname, response);
  }
  http.createServer(onRequest).listen(port);
  console.log("Démarrage du serveur.");
}

exports.start = start;