var express = require('express'),
    app = express();
var todoRoutes = require('./routes/todos');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

// telling express to start all routes with /api/todos
app.use('/api/todos', todoRoutes);

app.listen(3000, function() {
  console.log('App is running on port ' + 3000);
});