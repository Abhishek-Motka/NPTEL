var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var dbConfig = require('../config/database');

//Mongoose schema for User in mongodb
var UserSchema = mongoose.Schema({
		username: {
			type: String,
			required: true,
			max: 50,
			unique: true,
			dropDups: true
		},
		firstname: {
			type: String,
			require: true
		},
		lastname: {
			type: String,
			require: true
		},
		email: {
			type: String,
			required: true,
			max: 256,
			unique: true,
			dropDups: true
		},
		mobile: {
			type: String,
			required: true
		},
		type: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		}
});

var User = mongoose.model('User', UserSchema);

module.exports = User;

module.exports.getUserById = function(id, callback) {
	User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback) {
	var query = {username: username};
	User.findOne(query, callback);
};

module.exports.getUserByEmail = function(email, callback) {
	var query = {email: email};
	User.findOne(query, callback);
};

module.exports.addUser = function(newUser, callback){
		bcrypt.genSalt(10, function(err, salt){
			if(err) throw err;
			bcrypt.hash(newUser.password, salt, function(err, hash){
				if(err) throw err;
				newUser.password = hash;
				newUser.save(callback);
			});
		});
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
		if(err) throw err;
		callback(null, isMatch);
	});
};

module.exports.updateUser = function(username, newUser, callback) {
	query = {username: username};
	User.findOneAndUpdate(query, newUser, callback);
};

module.exports.updatePassword = function(username, newPassword, callback) {
	bcrypt.genSalt(10, function(err, salt) {
			if(err) throw err;
			bcrypt.hash(newPassword, salt, function(err, hash){
				if(err) throw err;

				var query = {username: username};
				var passUpdate = {password: hash};
				User.findOneAndUpdate(query, passUpdate, callback);
			});
	});
};

module.exports.getInstructors = function(callback) {
	var query = {type: "instructor"};
	User.find(query, callback);
};

module.exports.deleteUser = function(username, callback) {
	var query = {username: username};
	User.findOneAndRemove(query, callback);
};

module.exports.getUsers = function(callback) {
	User.find(callback);
};

module.exports.reset = function(callback) {
	User.remove({'type': {'$ne': 'instructor'}}, callback);
};
