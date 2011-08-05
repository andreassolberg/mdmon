var 
	http = require('http'),  
    io = require('socket.io'), // for npm, otherwise use require('./path/to/socket.io') 
	net = require('net'),
	sys = require("sys"),
	
    url = require("url"),
    fs = require("fs"),
    path = require("path"),
    
    port = process.argv[2] || 1337,
	
//	libxmljs = require("libxmljs"),
	mdparser = require('./mdparser.js'),
	mdvalidate = require('./mdvalidate.js'),
	
	statusdata, server
	;


statusdata = [];



// Web Server
server = http.createServer(function(request, response) {
	
	var 
		uri = url.parse(request.url).pathname, 
		filename = path.join(process.cwd(), '/files/', uri);
	
	if(uri === '/data') {
		response.writeHead(200, {"Content-Type": "application/json"});
		response.write(JSON.stringify(statusdata));
		response.end();
		return;	
	}
	
	path.exists(filename, function(exists) {
	
		if(!exists) {
			response.writeHead(404, {"Content-Type": "text/plain"});
			response.write("404 Not Found\n");
			response.end();
			return;
		}
		
		if (fs.statSync(filename).isDirectory()) filename += '/index.html';
		
		fs.readFile(filename, "binary", function(err, file) {
		
			if(err) {        
				response.writeHead(500, {"Content-Type": "text/plain"});
				response.write(err + "\n");
				response.end();
				return;
			}
			
			response.writeHead(200);
			response.write(file, "binary");
			response.end();
			
		});
		
	});
	
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");



















// http://kalmar2.org/simplesaml/module.php/aggregator/?id=kalmarcentral2&set=saml2

var options = {
	host: 'mds.edugain.org',
	port: 80,
	path: '/'

// 	host: 'bridge.uninett.no',
// 	port: 80,
// 	path: '/mds.xml'


// 	host: 'kalmar2.org',
// 	port: 80,
// 	path: '/simplesaml/module.php/aggregator/?id=kalmarcentral2&set=saml2'
// 	
// 	host: 'metadata.ukfederation.org.uk',
// 	port: 80,
// 	path: '/ukfederation-metadata.xml'
};
var mjs;



http.request(options, function(res) {
	if (res.statusCode !== 200) throw new Exception('Error retrieving metadata. Got a status code [' + res.statusCode + ']');
	
	content = '';
	res.setEncoding('utf8');
	
	res.on('data', function(chunk) {
		content += chunk;
//		console.log('Got chunk');
	});

	res.on('end', function() {
		statusdata = mdparser.parseFromString(content);
		mdvalidate.validate(statusdata);
		
		//console.log(statusdata);
		
//		xmldoc = libxmljs.parseXmlString(content);
		console.log('Parsed.');
	});
	
	//xmldoc = libxmljs.parseXmlString(res);
	// console.log(res);

}).on('error', function(e) {
	console.log('error');
	console.log(e);
	// throw new Exception('Error retrieving metadata. [' + e.message + ']');
}).end();





