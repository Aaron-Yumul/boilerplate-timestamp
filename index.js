// index.js
// Timestamp Microservice - freeCodeCamp boilerplate solution

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Example API endpoint (kept from boilerplate)
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

// Main timestamp endpoint
app.get('/api/:date?', (req, res) => {
  const { date } = req.params;
  let dateObj;

  if (!date) {
    // No date param -> use current time
    dateObj = new Date();
  } else if (/^\d+$/.test(date)) {
    // All-digit string -> treat as a Unix timestamp (in milliseconds)
    dateObj = new Date(parseInt(date, 10));
  } else {
    // Otherwise let the Date constructor try to parse it (e.g. "2015-12-25")
    dateObj = new Date(date);
  }

  if (dateObj.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  return res.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString(),
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
