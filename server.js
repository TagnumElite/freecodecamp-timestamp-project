// server.js
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

app.get("/api", function (req, res) {
    var date = new Date();
    res.json({unix: date.getTime(), utc: date.toGMTString()});
});

app.get("/api/:date/", function(req, res) {
    var date_string = req.params.date;
    var date;
    if (/^[0-9]*$/.test(date_string)) {
        date = new Date(parseInt(date_string));
    } else {
        date = new Date(date_string);
    }
    if (isNaN(date)) res.json({error: "Invalid Date"});
    res.json({unix: date.getTime(), utc: date.toGMTString()});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
