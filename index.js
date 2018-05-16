var express = require('express'),
app = express();


app.get('/', function(req, res) {
  res.send('HI THERE!');
});

app.get('/happy', function(req, res) {
  res.send(':)');
});

app.get('/sad', function(req, res) {
  res.send(':(');
});

app.listen(3000, function() {
  console.log('App is running on port ' + 3000);
});