const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
let socket = require('socket.io')

const port = process.env.PORT || 80;

//app setup
const app = express();
app.use(cors());

//Middleware
app.use(bodyParser.json());
app.use(express.static('public'))

let server = app.listen(port,function(){
	console.log(`Connected PORT: ${port}`)
});

//socket setup
let io = socket(server)

// io.set("transports", ["xhr-polling"]);
// io.set("polling duration", 10);

io.on('connection',(socket)=>{
	console.log('Socket Connected !!!',socket.id )
	//emit data everywhere
	socket.on('Marker-Race',function(data){
		io.emit('Marker-Race',data)
	})
})









