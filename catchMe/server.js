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
app.use(express.static('public'))
// app.use(express.static(__dirname + '/public/'));

//socket setup
var io = socket(server)

io.on('connection',(socket)=>{
	console.log('Socket Connected !!!',socket.id )
	//emit data everywhere
	socket.on('Marker-Race',function(data){
		io.emit('Marker-Race',data)
	})
})









