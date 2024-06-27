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
function isValidDate(dateString) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

app.get('/api/:date?', (req, res) => {
  const dateString = req.params.date;
  let date;

  if (!dateString) {
      // Handle case where no date is provided
      date = new Date();
  } else if (isValidDate(dateString)) {
      // Handle valid date input
      date = new Date(dateString);
  } else if (!isNaN(dateString) && !isNaN(parseInt(dateString))) {
      // Handle valid Unix timestamp
      date = new Date(parseInt(dateString));
  } else {
      // Handle invalid date input
      return res.json({ error: "Invalid date" });
  }

  const unixTimestamp = date.getTime();
  const utcTime = date.toUTCString();
  res.json({ unix: unixTimestamp, utc: utcTime });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
