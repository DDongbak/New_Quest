var express  = require('express');
var app      = express();

var http = require('http');
var fs = require("fs");

var mysql      = require('mysql');
var passport = require('passport');
var flash    = require('connect-flash');
var ejs = require('ejs');
var querystring = require("querystring");
var secret = require("./secret.json")

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var connection = mysql.createConnection({
  host     : 'jpdev.silver.knowre.com',
  user     : secret.user,
  password : secret.password,
  database : 'dmpark'
});

connection.connect(function(err){
  if(!err){
    console.log("Database is connected..\n;");
  }
  else{
    console.log("Error connecting database..\n");
  }
});


var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;

//var User = require('../app/models/user');

//var configAuth = require('./auth');


app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(session({ secret: 'LionelMessi' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


http.createServer(app).listen(3000, function () {
    console.log('server running at http://local.knowreapi.com:3000');
});

passport.serializeUser(function(user, done) {
    console.log('serialize');
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    console.log('deserialize');
    done(null, user);
});

passport.use(new GoogleStrategy({
        clientID: secret.ClientID,
        clientSecret: secret.ClientSecret,
        callbackURL: "http://local.knowreapi.com:3000/auth/google/callback"
    },
    function(token, refreshToken, profile, done) {
        console.log('Do GoogleStrategy');
        var user = {'birthday' : profile._json.birthday, 
                    'name' : profile._json.displayName,
                    'id' : profile._json.id
                    };

        console.log(profile);
        done(null, user);
    }
));

app.get('/', function (req, res) { //open the first server
    fs.readFile('oauth.html', function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
});

app.get('/profile', function (req, res) {
    console.log("/profile started");
    console.log('req.user : '+req.user);

    var user = {'id' : req.user.id,
                'name' : req.user.name,
                'birthday' : req.user.birthday};

    console.log('user : '+user);

    var query = connection.query('INSERT INTO user set ?', user, function (err, rows){
    
        if (err){
          console.log('updating... '+err);
          throw err;
        }
        else{
          console.log('rows : ' + rows);
        }
    });


    res.render('profile.ejs', {
        user : req.user // get the user out of session and pass to template
    });  
});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile','https://www.googleapis.com/auth/plus.me'] })
);

app.get('/auth/google/callback', 
    passport.authenticate('google', { 
        successRedirect: '/profile', 
        failureRedirect: '/' 
    })
);
