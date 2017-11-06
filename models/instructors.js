var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var dbConfig = require('../config/database');

//Mongoose schema for User in mongodb
var InstructorSchema = mongoose.Schema({
		username: {
			type: String,
			required: true,
			max: 50,
			unique: true,
			dropDups: true
		},
		clg: {
      type: String,
      required: true
    },
    dob: {
      type: Date,
      required: true
    },
    gender: {
      type: String,
      required: true,
      default: "M"
    },
    qualifications: {
      type: String
    },
    experience: {
      type: Number,
      required: true
    }
});

var Instructor = mongoose.model('Instructor', InstructorSchema);

module.exports = Instructor;

module.exports.getInstructorById = function(id, callback) {
	Instructor.findById(id, callback);
};

module.exports.getInstructorByUsername = function(username, callback) {
	var query = {username: username};
	Instructor.findOne(query, callback);
};

module.exports.addInstructor = function(newInstructor, callback){
	newInstructor.save(callback);
};

module.exports.updateInstructor = function(username, newInstructor, callback) {
	var query = {username: username};
	Instructor.findOneAndUpdate(query, newInstructor, callback);
};

module.exports.deleteInstructor = function(username, callback) {
	var query = {username: username};
	Instructor.findOneAndRemove(query, callback);
};

module.exports.getInstructors = function(callback) {
	Instructor.find(callback);
};
