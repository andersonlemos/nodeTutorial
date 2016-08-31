var express = require('express');
var load = require('express-load');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var app = express();

app.set('views',__dirname + '/views');
app.set('view engine','ejs');

app.use(cookieParser('ntalk'));
app.use(expressSession());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

load('models')
    .then('controllers')
    .then('routes')
    .into(app);

app.listen(3000,function(){
  console.log('NTalk no ar');
});
