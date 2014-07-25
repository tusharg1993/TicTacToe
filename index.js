var app = require("express")();
var http = require ("http").Server(app);
var io = require("socket.io")(http);

app.get("/",function(req,res){
	res.sendfile("index.html");
});

app.get("/stylesheet.css",function(req,res){
	res.sendfile("stylesheet.css");
});

app.get("/logic.js",function(req,res){
	res.sendfile("logic.js");
});

io.on('connection', function(socket){
	console.log('User connected: '+ socket.id);
	
	socket.on('disconnect', function(){
		console.log('User disconnected: '+socket.id);
	});

	socket.on("idclick",function(id){
		console.log("Receive Click from id "+id)
		io.emit("idclick",id);
	});

	socket.on("newgame",function(){
		console.log("Server Receive: Newgame");
		io.emit("newgame");
	});
});

http.listen(3000,function(){
	console.log("Server starterd. Listening on Port 3000....");
});