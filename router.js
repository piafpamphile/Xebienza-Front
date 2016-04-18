var fs = require('fs');
var path = require('path');

function route(handle, pathname, response) {
  console.log("Début du traitement de l'URL " + pathname + ".");
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response);
  } else {
    var filePath = '.' + pathname;
    if (filePath == './')
    	filePath = './xebienza.html';
    	
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
    	case '.js':
    		contentType = 'text/javascript';
    		break;
    	case '.css':
    		contentType = 'text/css';
    		break;
    }
    	
    fs.readFile(filePath, function(error, content) {
    	if (error) {
    		response.writeHead(500);
    		response.end();
    	}
    	else {
    		response.writeHead(200, { 'Content-Type': contentType });
    		response.end(content, 'utf-8');
    	}
    });
  }
}

exports.route = route;
