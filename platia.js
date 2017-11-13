var express = require('express');

var app = express();

app.disable('x-powered-by');

var handlebars = require('express-handlebars').create({defaultLayout:'main'})

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//more imports
app.use(require('body-parser').urlencoded({extended: false}));
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

app.get('/menu', function(req, res){
  res.render('menu');
});

app.get('/contact', function(req, res){
  res.render('contact');
});

app.use(function(req, res, next){
  console.log("URL : " + req.url);
  next();
});

app.use(function(req, res){
  res.type('text/html');
  res.status(404);
  res.redner('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});
