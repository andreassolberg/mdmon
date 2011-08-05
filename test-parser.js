var http = require('http'),  
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




// https://foodl.org/simplesaml/module.php/saml/sp/metadata.php/saml

var options = {
	host: 'mds.edugain.org',
	port: 80,
	path: '/'
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
		console.log(mdparser);
		statusdata = mdparser.parseFromString(content);
		mdvalidate.validate(statusdata);
		
		console.log(statusdata['https://aai-viewer.switch.ch/shibboleth']);
		
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





