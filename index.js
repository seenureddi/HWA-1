// HW Assignment #1 for Pirple
// curl --header "Content-Type: application/json" --request POST
//  --data {\"username\":\"xyz\",\"password\":\"xyz\"} http://localhost:3000?name=john
// This command will exercise GET and POST data handling procedures.

// Dependencies
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var util = require('util');
var jokesLib = require('./lib/jokes');

// Get all the jokes
var allJokes = jokesLib.allJokes();
// Get the length of the jokes
var numberOfJokes = allJokes.length;

// Instantiate the HTTP server
var httpServer = http.createServer((req, res) => {
    
  // get a random joke
  var rnd = Math.floor(Math.random() * Math.floor(numberOfJokes));
  var joke = allJokes[rnd];
    
  // look at req
  console.log("req: " + util.inspect(req));
  console.log("\n");

  // Parse the url
  var parsedUrl = url.parse(req.url, true);
  console.log("Parsed URL: " + JSON.stringify(parsedUrl));
  console.log("\n");

  // Get the path
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, '');
  console.log("Trimmed Path: " + trimmedPath);
  console.log("\n");

  // Get the query string as an object
  var queryStringObject = parsedUrl.query;
  console.log("Query String Object: " + JSON.stringify(queryStringObject));
  console.log("\n");

  // Get the HTTP method
  var method = req.method.toLowerCase();
  console.log("Requested Method: " + method);
  console.log("\n");

  //Get the headers as an object
  var headers = req.headers;
  console.log("Headers: " + JSON.stringify(headers));
  console.log("\n");

  // Use the status code returned from the handler, or set the default status code to 200
  var statusCode = 200;

  // need on data to reach on end !!
  var data = "";
  req.on('data', (newData) => {
    data += newData;
    console.log('data = ' + data);
  });

  req.on('end', function() {
    // Return the response
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(statusCode);

    if (data != "") {    
      data = JSON.parse(data);
    }
    
    var helloString;
    if (trimmedPath.toLowerCase() == 'hello') {
      helloString = {
        api: trimmedPath,
        mesg: joke
      };
    } else {
      helloString = {
        api: trimmedPath,
        mesg: "Who are you ?  What are you doing here ?"
      };        
    };
    
    data = Object.assign(headers, queryStringObject, data, helloString);
    res.end(JSON.stringify(data));
  });
});

// Start the HTTP server
httpServer.listen(3000, () => {
  console.log('The HTTP server is running on port 3000 !');
});
