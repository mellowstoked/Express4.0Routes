// server.js
// BASE SETUP

var express = require('express'),
    app     = express(),
    port    = process.env.PORT || 8080;

// ROUTES

app.get('/sample', function(req, res) {
  res.send('this is a sample!');
});

// show the form (GET http://localhost:8080/login)
app.route('/login')
  .get(function(req, res) {
    res.send('this is the login form');
  })
  .post(function(req, res){ // process the form
    console.log('processing');
    res.send('processing the login form');
});



//ROUTER Express
var router = express.Router();

// middleware that will happen on every request
// the order matters
router.use(function(req, res, next){
  console.log(req.method, req.url); // logs to the console the method
  next();
});

// route middleware to validate :name
// I had to move this middleware above
router.param('name', function(req, res, next, name) {
  console.log('doing name validations on ' + name);
  req.name = name;
  next();
});

// route with parameters (/hello/:name)
router.get('/hello/:name', function(req, res) {
  res.send('hello', req.params.name + '!');
});



router.get('/', function(req, res) {
  res.send('I\'m the home page');
});

router.get('/about', function(req, res) {
  res.send('I\'m the about page!');
});

// apply the routes to our application
app.use('/', router);
app.use('/app', router);

app.listen(port);
console.log('Magic happens on port ' + port);
