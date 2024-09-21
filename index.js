// index.js

// Import required modules
const express = require('express');
const app = express();
const cors = require('cors');

// Enable CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// Static file serving
app.use(express.static('public'));

// Root route (serve the HTML page)
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint to handle date parsing
app.get("/api/:date?", function (req, res) {
  const dateParam = req.params.date;

  // If no date is provided, use the current date
  let date;
  if (!dateParam) {
    date = new Date();
  } else {
    // Check if the parameter is a Unix timestamp
    if (!isNaN(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      // Try to parse the date string
      date = new Date(dateParam);
    }
  }

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Return the Unix timestamp and UTC string
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Start the server
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
