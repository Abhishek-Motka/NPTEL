var mongoose = require('mongoose');
var dbConfig = require('../config/database');

var TokenSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		dropDups: true
	},
	exp: {
		type: Date,
		required: true
	}
});

var Token = mongoose.model('Token', TokenSchema);

module.exports = Token;

module.exports.getTokenById = function(id, callback) {
	Token.findById(id, callback);
};

module.exports.addToken = function(token, callback) {
	token.save(callback);
};

module.exports.updateToken = function(username, token, callback) {
	var query = {username: username};
	Token.findOneAndUpdate(query, token, callback);
};

module.exports.getTokenByUsername = function(username, callback) {
	var query = {username: username};
	Token.findOne(query, callback);
};

module.exports.removeToken = function(username, callback) {
	var query = {username: username};
	Token.findOneAndRemove(query, callback);
};
