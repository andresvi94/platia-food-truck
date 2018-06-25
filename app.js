var AWS = require('aws-sdk');
var express = require('express');

// AWS.config.region = process.env.REGION
AWS.config.region = 'us-east-1'
var sns = new AWS.SNS();
var snsTopic = process.env.NEW_SIGNUP_TOPIC;
var app = express();

app.disable('x-powered-by');

var handlebars = require('express-handlebars').create({defaultLayout:'main'})

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//more imports
app.use(require('body-parser').urlencoded({extended: false}));
var moment = require('moment');
//end imports
app.set('port', process.env.PORT || 3000);

//app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/'));

app.listen(app.get('port'), function(){
  console.log("Express started on http://localhost:" + app.get('port') + ' press Ctrl-C to terminate');
});

app.get('/', function(req, res){
  res.render('home');
});

app.get('/events', function(req, res){
  res.render('events');
});

app.get('/menu', function(req, res){
  res.render('menu');
});

app.get('/contact', function(req, res){
  res.render('contact');
});

app.get('/contact-thanks', function(req, res){
  res.render('thankyou');
});

app.post('/process', function(req, res, next){
  sns.publish({
      'Message': 'Name: ' + req.body.name + "\r\nEmail: " + req.body.email
                          + "\r\nPhone: " + req.body.phone
                          + "\r\nMessage: " + req.body.message,
      'Subject': req.body.subject,
      'TopicArn': 'arn:aws:sns:us-east-1:715052692001:NotifyMe'
  }, function(err, data) {
      if (err) {
          res.status(500).end();
          // next();
          console.log('SNS Error: ' + err);
      } else {
          res.status(201).end();
      }
  });

  res.redirect(303, '/contact-thanks');
});

app.use(function(req, res, next){
  console.log("URL : " + req.url);
  next();
});

app.use(function(req, res){
  res.type('text/html');
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});
