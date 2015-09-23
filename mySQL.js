var http = require("http");
var fs = require("fs");
var bodyParser = require("body-parser")
var cookieParser = require("cookie-parser");
var querystring = require("querystring");
var secret = require("./secret.json")

var express    = require('express');
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'jpdev.silver.knowre.com',
  user     : secret.user,
  password : secret.password,
  database : 'dmpark'
});

var app=express();

app.use(cookieParser());
app.use(bodyParser());

connection.connect(function(err){
  if(!err){
    console.log("Database is connected..\n;");
  }
  else{
    console.log("Error connecting database..\n");
  }
});

app.get("/library.js", function (req, res){
  fs.readFile('library.js', function (err, data){
    res.writeHead(200, {"Content-Type" : "text/javascript"});
    res.write(data);
    res.end();
  });  
});

app.get("/library.css", function (req, res){
  fs.readFile('library.css', function (err, data){
    res.writeHead(200, {"Content-Type" : "text/css"});
    res.write(data);
    res.end();
  });  
});



app.get("/", function (req, res){
  console.log("page start");

  fs.readFile("mySQL.html", function (err, data){
    res.writeHead(200, {"Content-Type" : "text-html"});
    res.write(data);
    res.end();
  });

});


app.post('/search', function (req, res){

  console.log('post-search has started');
  var menu = req.body.menu;
  var content = req.body.content;

  console.log('menu : ' + menu);
  console.log('content : ' + content);

  var the_rows=[];
  var findedbooks = [];

  var query = connection.query('select * from books', function (err, rows){

    if (!err)
      console.log('Table is read..');
    else
      console.log('Error while performing Query.');

    if(menu==='title'){
        for(i=0;i<rows.length;i++){
          if(content===rows[i].title){
            console.log(content);
            the_rows.push(i);
          }
        }
      }

      if(menu==='author'){
        for(i=0;i<rows.length;i++){
          if(content===rows[i].author){
            console.log(content);
            the_rows.push(i);
          }
        }
      }

      if(menu==='publisher'){
        for(i=0;i<rows.length;i++){
          if(content===rows[i].publisher){
            console.log(content);
            the_rows.push(i);
          }
        }
      }

      if(menu==='lender'){
        for(i=0;i<rows.length;i++){
          if(content===rows[i].lender){
            console.log(content);
            the_rows.push(i);
          }
        }
      }

      for(i=0;i<the_rows.length;i++){
        console.log('the_rows['+i+'] : '+the_rows[i]);
        findedbooks[i]=JSON.stringify(rows[the_rows[i]]); 
      }

      res.writeHead(200, { "Content-Type" : "text/html" });
      res.write('[');
      for(i=0;i<the_rows.length;i++){
        if(i!==(the_rows.length-1)){
          res.write(findedbooks[i]+',');         
        }
        else{
          res.write(findedbooks[i]);
        }
      }
      res.write(']');
      res.end();
  });
  //connection.end();
});



app.post("/update", function (req, res){
  console.log('post-update has started');

  var title = req.body.title;
  var lender = req.body.lender;
  var loan_date = req.body.loan_date;
  var due_date = new Date(loan_date);
  due_date.setDate(due_date.getDate()+7);


  console.log('title : ' + title);
  console.log('lender : ' + lender);
  console.log('loan_date : ' + loan_date);
  console.log("due_date :"+due_date);

  var data = [lender, loan_date, due_date, title];
  console.log('data : '+data);

  var query = connection.query('update books set lender = ? , loan_date = ? , due_date = ? where title = ?', data, function (err, rows){
    if (err){
      console.log('updating... '+err);
      throw err;
    }
    else{
      console.log('rows : ' + rows);
    }
  });
  //connection.end();

  res.writeHead(200, {"Content-Type" : "text/html"});
  res.write("The DB has been updated");
  res.end();
});

http.createServer(app).listen(3000, function(){
  console.log("Server has started");
});