// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', (req, res) => {
  const dateString = req.params.date;

  if (!dateString) {
      const currentUnixTimestamp = new Date().getTime();
      const currentUtcTime = new Date().toUTCString();
      res.json({ unix: currentUnixTimestamp, utc: currentUtcTime });
  } else if (!isNaN(dateString) && !isNaN(parseInt(dateString))) {
      const unixTimestamp = parseInt(dateString);
      const date = new Date(unixTimestamp);
      if (!isNaN(date.getTime())) {
          const utcTime = date.toUTCString();
          res.json({ unix: unixTimestamp, utc: utcTime });
      } else {
          res.json({ error: 'Invalid date' });
      }
  } else {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
          const unixTimestamp = date.getTime();
          const utcTime = date.toUTCString();
          res.json({ unix: unixTimestamp, utc: utcTime });
      } else {
          res.json({ error: 'Invalid date'});
      }
  }
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
