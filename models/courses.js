var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var dbConfig = require('../config/database');

//Mongoose schema for User in mongodb
var CoursesSchema = mongoose.Schema({
		courseno: {
			type: String,
			required: true,
			max: 50,
			unique: true,
			dropDups: true
		},
		coursename: {
      type: String,
      required: true
    },
    instructor: {
      type: String,
      required: true
    },
    startdate: {
      type: Date
    },
    enddate: {
      type: Date
    },
    paid: {
      type: Boolean,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
		institute: {
			type: String,
			required: true
		},
    likes: {
      type: Number,
      required: true,
      default: 0
    },
		insname: {
			type: String,
			required: true
		}
});

var Courses = mongoose.model('Courses', CoursesSchema);

module.exports = Courses;

module.exports.getCourseById = function(id, callback) {
	Courses.findById(id, callback);
};

module.exports.getCourses = function(callback) {
  Courses.find({},  [courseno, coursename, startdate, enddata, paid, likes, category], callback);
};

module.exports.getCourseNames = function(callback) {
	Courses.find({}, [courseno, coursename], callback);
};

module.exports.getCourseList = function(callback) {
	Courses.find({}, [courseno, coursename, insname, institute, category], callback);
};

module.exports.filter = function(array1, array2, callback) {
	Course.find({institute: {$in: array1}, category: {$in: array2}}, callback);
};

module.exports.getCourseDetailsByCourseNo = function(courseno, callback) {
  var query = {courseno: courseno};
  Courses.findOne(query, callback);
};

module.exports.getCoursesByInstructor = function(username, callback) {
	var query = {instructor: username};
	Courses.find(query, [courseno, coursename, startdate, enddata, paid, likes, category], callback);
};

module.exports.getCoursesByCategory = function(category, callback) {
  var query = {category: category};
  Courses.find(query, [courseno, coursename, startdate, enddata, paid, likes, category], callback);
};

module.exports.getPaidCourses = function(callback) {
  var query = {paid: true};
  Courses.find(query, callback).select({courseno: 1, coursename: 1, startdate: 1, enddata: 1, paid: 1, likes: 1, category: 1, _id: 0});
};

module.exports.getFreeCourses = function(callback) {
  var query = {paid: false};
  Courses.find(query, callback).select({courseno: 1, coursename: 1, startdate: 1, enddata: 1, paid: 1, likes: 1, category: 1, _id: 0});
};

module.exports.getPopularCourses = function(callback) {
  Courses.find({}, [courseno, coursename, startdate, enddata, paid, likes, category], {limit:3, sort: {likes: -1}}, callback);
};

module.exports.getUpcomingCourses = function(callback) {
  Courses.find({startdate: {$gte: new Date()}},  [courseno, coursename, startdate, enddata, paid, likes, category], {limit: 2, sort: {startdate: 1}}, callback);
};

module.exports.addCourse = function(newCourse, callback){
	newCourse.save(callback);
};

module.exports.updateCourse = function(courseno, newCourse, callback) {
	var query = {courseno: courseno};
	Courses.findOneAndUpdate(query, newCourse, callback);
};

module.exports.deleteCourse = function(courseno, callback) {
	var query = {courseno: courseno};
	Courses.findOneAndRemove(query, callback);
};
