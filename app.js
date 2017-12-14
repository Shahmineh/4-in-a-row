// Require
const express = require('express');
const flexjson = require('jsonflex')();
const compression = require('compression');

// Create express server
const app = express();

// Express middleware
app.use(compression());
app.use(flexjson);
app.use(express.static('www'));

// Serve the index.html page on every request that
// doesn't have a file extension in its url
// (so that single page apps work on page reload)
app.get(/^[^\.]*$/, (req, res) => {
  res.sendFile(__dirname + '/www/index.html');
});

// Start server
app.listen(3000, () =>
  console.log('Webserver listening on port 3000')
);
