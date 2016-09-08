
const KEY = 'ntalk.sid';
const SECRET = 'ntalk';
var express = require('express');
var load = require('express-load');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var error = require('./middlewares/error');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var cookie = cookieParser(SECRET);
var store =  new expressSession.MemoryStore();

app.set('views',__dirname + '/views');
app.set('view engine','ejs');

app.use(cookieParser('ntalk'));
app.use(expressSession({
  secret: SECRET,
  name: KEY,
  resave: true,
  saveUninitialized: true,
  store: store
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

io.use(function(socket,next){
  var data =   socket.request;
  cookie(data,{},function(err){
    var sessionID = data.signedCookies[KEY];
    store.get(sessionID,function(err,session){
      if(err||!session){
        return next(new Error('acesso negado'));
      }else{
        socket.handshake.session = session;
        return next();
      }
    });
  });
});


load('models')
    .then('controllers')
    .then('routes')
    .into(app);

load('sockets')
    .into(io);

app.use(error.notFound);
app.use(error.serverError);

server.listen(3000,function(){
  console.log('NTalk no ar');
});
