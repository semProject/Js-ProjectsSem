var express = require('express');
// const bodyParser = require("body-parser");
// var path = require("path");
var socket = require('socket.io')

var port = process.env.PORT || 4000;

//app setup
var app = express();
// app.use(bodyParser.json());

var server = app.listen(port,function(){
	console.log(`Connected port: ${port}`)
});
// Static folder
//middleware static
app.use(express.static('public'))
// app.use(express.static(__dirname + '/public/'));

//socket setup
var io = socket(server)

let tab = [];

io.on('connection',(socket)=>{
	console.log('Socket Connected !!!',socket.id )

	//emit data everywhere
	socket.on('Marker-Race',function(data){
		io.emit('Marker-Race',data)
	})
	//emit data everywhere
	socket.on('sync-ping',function(data){
		io.emit('sync-ping',data)
	})
	//emit data everywhere
	socket.on('setData',function(data){
		io.emit('setData',data)
	})


})

// io.on('connection', socket => {
	//emit 2.0.4 works
// 	socket.emit('request', /* … */); // emit an event to the socket
// 	io.emit('broadcast', /* … */); // emit an event to all connected sockets
// 	socket.on('reply', () => { /* … */ }); // listen to the event
//   });









