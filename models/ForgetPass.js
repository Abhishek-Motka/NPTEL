var mongoose = require('mongoose');

var ForgetPassSchema = mongoose.Schema({
	hashedPassword: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	usernameHash: {
		type: String,
		required: true
	}
});

var ForgetPassword = mongoose.model('ForgetPassword', ForgetPassSchema);

module.exports = ForgetPassword;

module.exports.addForgotPass = function(forgotPass, callback) {
	forgotPass.save(callback);
};

module.exports.getForgotPassById = function(id, callback) {
	ForgetPassword.findById(id, callback);
};

module.exports.getUsername = function(hashed_pass, username_hashed, callback) {
	var query = {
		hashedPassword: hashed_pass,
		usernameHash: username_hashed
	};
	ForgetPassword.findOne(query, callback);
};

module.exports.getByUsername = function(username, callback) {
	var query = {username: username};
	ForgetPassword.findOne(query, callback);
};

module.exports.deleteByUsername = function(username, callback) {
	var query = {username: username};
	ForgetPassword.findOneAndRemove(query, callback);
};

module.exports.updateByUsername = function(username, newPassword, callback) {
	var query = {username: username};
	ForgetPassword.findOneAndUpdate(query, newPassword, callback);
};

module.exports.reset = function(callback) {
	ForgetPassword.remove({}, callback);
};
