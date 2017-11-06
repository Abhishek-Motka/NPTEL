var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');
var io = require('socket.io');

var port = 3000;

var options = {
	key: fs.readFileSync(__dirname + '/security/key.pem'),
	cert: fs.readFileSync(__dirname + '/security/certificate.crt')
};

var dbConfig = require(__dirname+'/config/database');

//mongoose database connection
mongoose.connect(dbConfig.database);

//Connected event handler
mongoose.connection.on('connected', function(){
	console.log('Conneceted to Database '+ dbConfig.database);
});

//Mongoose event handler for error
mongoose.connection.on('error', function(err) {
	console.log('Database Error: '+err);
});

var app = express();

//CORS middleware
app.use(cors());

//Set static folder to public
app.use(express.static('public'));

//Body Parser middleware
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require(__dirname+'/config/passport')(passport);

var users = require(__dirname + "/routes/users");
var forget_password = require(__dirname + "/routes/forgot_pass");
var instructor = require(__dirname + "/routes/instructors");
var courses = require(__dirname + "/routes/courses");
var livestream = require(__dirname + "/routes/livestream");

app.use('/api/users', users);
app.use('/api/forgetpass', forget_password);
app.use('/api/instructor', instructor);
app.use('/api/courses', courses);
app.use('/api/lstream', livestream);

//Starting the server
//var server = https.createServer(options, app);

var server = http.createServer(app);

io = io.listen(server);

io.on('connection', function(client) {

		client.on('disconnect', function() {
				var data = {};
				data.id = client.id;
				io.sockets.emit('remove', {user: JSON.stringify(data)});
		});

		client.on('send', function(message) {
			var data = JSON.parse(message);
			io.sockets.emit('receive', {data: JSON.stringify(data)});
		});

		client.on('hi', function(message) {
			var data = JSON.parse(message);
			data.id = client.id;
			io.sockets.emit('broadcast', {user: JSON.stringify(data)});
		});
});

server.listen(3000, function() {
	console.log("Server started on port "+ port);
});
