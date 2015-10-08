var express = require('express')

var fs = require('fs');

var app = express();

var server = app.listen(1111, function(){
	console.log("server has started");
});

var io = require('socket.io').listen(server);

app.get("/newsketchboard.js", function (req, res){
	fs.readFile('newsketchboard.js', function (err, data){
		res.writeHead(200, {"Content-Type" : "text/javascript"});
		res.write(data);
		res.end();
	});
});

app.get("/", function (req, res){
	console.log("page start");

	fs.readFile("svg.html", function (err, data){
		res.writeHead(200,{"Content-Type" : "text/html"});
		res.write(data);
		res.end();
	});
});

io.sockets.on('connection', function (socket) {
	socket.on('square', function (data){
		console.log("server got square socket : " + data);
		socket.broadcast.emit('fromserver_square',data);
	});
	socket.on('triangle', function (data){
		console.log("server got triangle socket : "+ data);
		socket.broadcast.emit('fromserver_triangle', data);
	});
	socket.on("circle", function (data){
		console.log("server got circle socket :"+ data);
		socket.broadcast.emit('fromserver_circle', data);
	});
	socket.on("clickeddom", function (data){
		console.log("server got clickeddom socket : "+data);
		socket.broadcast.emit('fromserver_clickeddom', data);
	});
	socket.on("keycode", function (data){
		console.log("server got keycode socket"+data);
		socket.broadcast.emit('fromserver_keycode', data);
	});
});