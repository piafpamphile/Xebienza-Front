var azure = require('azure-storage');

var accessKey = 'GW3gpzW2TtcSqxS+EWsq4+CiwN7IRb5yTpEIVaLVVYxyMIjmnxqbbwnqzNKPekw5UohX71odmRP72n4TOxAiWA==';
var storageAccount = 'devox';
var containerName = 'images';
var blobService = azure.createBlobService(storageAccount, accessKey);

Array.prototype.select = function(expr){
    var arr = this;
    //do custom stuff
    return arr.map(expr); //or $.map(expr);
};


function getFiles(response) {
	console.log("Le gestionnaire 'getFiles' est appelé.");
	
	var blobs = [];
	
	function shuffleArray(array) {
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
	    
	    return array;
	}
	
	function aggregateBlobs(err, result, cb) {
	    if (err) {
	       cb(er);
	    } else {
	        blobs = blobs.concat(result.entries);
	        if (result.continuationToken !== null) {
	            blobService.listBlobsSegmented(
	                containerName,
	                result.continuationToken,
	                aggregateBlobs);
	        } else {
	            cb(null, blobs);
	        }
	    }
	}
	
	blobService.listBlobsSegmented(containerName, null, function(err, result) {
	    aggregateBlobs(err, result, function(err, blobs) {
	        if (err) {
	            console.log("Couldn't list blobs");
	            console.error(err);
	            response.writeHead(500);
	            response.end();
	        } else {
	        	var files = blobs.select(function(v){
	        	    return 'https://devox.blob.core.windows.net/images/' + v.name;
	        	});

	            console.log(shuffleArray(files));
	            response.writeHead(200, {"Content-Type": "application/json"});
	            var json = JSON.stringify(files);
	            response.end(json);
	        }
	    });
	});
}

exports.getFiles = getFiles;