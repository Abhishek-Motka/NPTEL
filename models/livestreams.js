var mongoose = require('mongoose');

var LStreamSchema = mongoose.Schema({
	courseno: {
		type: String,
		required: true,
    unique: true,
    dropDups: true,
    default: "cs001"
	},
  username: {
    type: String,
    required: true
  },
	embedcode: {
		type: String,
		required: true
	}
});

var LStream = mongoose.model('LStream', LStreamSchema);

module.exports = LStream;

module.exports.addLStream = function(lStream, callback) {
	lStream.save(callback);
};

module.exports.getLStreamById = function(id, callback) {
	LStream.findById(id, callback);
};

module.exports.getLStreamByInstructor = function(username, callback) {
  var query = {username: username};
  LStream.findOne(query, callback);
};

module.exports.getByCourseno = function(courseno, callback) {
	var query = {courseno: courseno};
	LStream.findOne(query, callback);
};

module.exports.deleteByUsername = function(username, callback) {
	var query = {username: username};
	LStream.findOneAndRemove(query, callback);
};

module.exports.getAllStream = function(callback) {
  LStream.find(callback);
};
