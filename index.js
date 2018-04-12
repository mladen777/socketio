var app		= require('express')();
var http	= require('http').Server(app);
var io		= require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){

	socket.emit('message', 'You are connected!');

	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});

	socket.on('message', function (message) {

        console.log('A client is speaking to me! They’re saying: ' + message);
		socket.emit('message', message );

    }); 
});
   

http.listen(3000, function(){
  console.log('listening on *:3000');
});