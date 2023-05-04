const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

const cups = ['A', 'B', 'C'];
let ballPosition = '';

// Function to shuffle the cups array
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Function to display the cups
function displayCups() {
  console.log(`\n   ${cups[0]}   ${cups[1]}   ${cups[2]}`);
}

// Function to handle HTTP requests
function onRequest(request, response) {
  const parsedUrl = url.parse(request.url);
  const path = parsedUrl.pathname;

  if (path === '/') {
    // Serve the HTML file
    response.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream('index.html').pipe(response);
  } else if (path === '/style.css') {
    // Serve the CSS file
    response.writeHead(200, { 'Content-Type': 'text/css' });
    fs.createReadStream('style.css').pipe(response);
  } else if (path === '/script.js') {
    // Serve the JavaScript file
    response.writeHead(200, { 'Content-Type': 'text/javascript' });
    fs.createReadStream('script.js').pipe(response);
  } else if (path === '/start') {
    // Shuffle the cups array and randomly place the ball
    shuffle(cups);
    ballPosition = cups[Math.floor(Math.random() * 3)];

    // Send the ball position as a response
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write(ballPosition);
    response.end();
  } else if (path === '/guess') {
    let body = '';
    request.on('data', chunk => {
      body += chunk.toString();
    });

    request.on('end', () => {
      const guess = querystring.parse(body).guess.toUpperCase();

      if (guess === ballPosition) {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.write('Congratulations, you guessed correctly!');
        response.end();
      } else {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.write(`Sorry, the ball was under cup ${ballPosition}.`);
        response.end();
      }
    });
  } else {
    // Handle invalid requests
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.write('404 Not Found');
    response.end();
  }
}

// Create the HTTP server
const server = http.createServer(onRequest);

// Start listening for requests
server.listen(4000, () => {
  console.log('Server is listening on port 4000');
});
