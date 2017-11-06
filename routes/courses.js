var express = require('express');
var config = require('../config/database');
var passport = require('passport');
var auth = require('../scripts/authentication');

var Courses = require('../models/courses');
var Instructor = require('../models/user');

var router = express.Router();

//Route for REGISTER
//Only logged in admin can register new user.
router.post('/add', passport.authenticate('jwt',{session: false}), function(req, res, next){

	//Create user object from the request body
	var newCourse = new Courses({
		courseno: req.body.courseno,
    coursename: req.body.name,
    instructor: req.user.username,
    startdate: req.body.sdate,
    enddate: req.body.edate,
    paid: req.body.paid,
    description: req.body.desc,
    category: req.body.cat,
		institute: req.body.institute,
    likes: 0,
		insname: ""
	});

	//Check if user with same username exists
	Courses.getCourseDetailsByCourseNo(newCourse.courseno, function(err, course){
		if(err) {
			return res.status(500).json({success: false, msg: "Server Error."});
		}

		//If instructor exists, registration fails
		if(course) {
			return res.json({success: false, msg: 'Course with same course no exists.'});
		}

		Instructor.getUserByUsername(req.user.username, function(err, instructor) {
			if(err)
				return res.status(500).json({success: false, msg: "Server Error."});

			if(!instructor)
				return res.json({success: false, msg: "No instructor exists with given username"});

			newCourse.insname = instructor.firstname+" "+instructor.lastname;

			Courses.addCourse(newCourse, function(err, addedCourse) {
				console.log(err);
	      //Failed due to server error
	      if(err){
	        return res.json({success: false, msg:'Failed to create a new course'});
	      }else if(addedCourse){
	        //Successfully registered
	        return res.json({success: true, msg: 'Course added to the catelog'});
	      }else{
	        return res.json({success: false, msg: "Course can not be created"});
	      }
	    });
		});
	});
});

router.post('/update', passport.authenticate('jwt', {session: false}), auth.roleAuthorization(['instructor']), function(req, res, next) {
  if(!req.body.courseno){
    return res.json({success: false, msg: "Courseno is required for the update"});
  }

  var newCourse = {};
  newCourse.courseno = req.body.courseno;

  if(req.body.name)
    newCourse.coursename = req.body.name;
  if(req.body.sdate)
    newCourse.startdate = req.body.sdate;
  if(req.body.edate)
    newCourse.enddate = req.body.edate;
  if(req.body.paid)
    newCourse.paid = req.body.paid;
  if(req.body.cat)
    newCourse.category = req.body.cat;
  if(req.body.desc)
    newCourse.description = req.body.desc;
	if(req.body.institute)
		newCourse.institute = req.body.institute;

  Courses.getCourseDetailsByCourseNo(newCourse.courseno, function(err, course) {
      if(err)
        return res.json({success: false, msg: "Server Error"});

      if(!course)
        return res.json({success: false, msg: "Course with given course no doesn't exists"});

      if(course.instructor !== req.user.username)
        return res.json({success: false, msg: "You are not authorized to made an update"});

      Courses.updateCourse(newCourse.courseno, newCourse, function(err, updatedCourse) {
        if(err)
          return res.json({success: false, msg: "Server Error"});

        if(!updatedCourse)
          return res.json({success: false, msg: "Error in updateing the course"});

        return res.json({success: true, msg: "Course is updated Successfully"});
      });
  });

});

router.delete('/delete', passport.authenticate('jwt', {session: false}), auth.roleAuthorization(['instructor']), function(req, res, next) {
  if(!req.body.courseno)
    return res.json({success: false, msg: "Can't delete the course"});

  Courses.getCourseDetailsByCourseNo(req.body.courseno, function(err, course) {
    if(err)
      return res.json({success: false, msg: "Server Error"});

    if(!course)
      return res.json({success: false, msg: "This course doesn't exist anymore"});

    if(course.instructor !== req.user.username)
      return res.json({success: false, msg: "You are not authorized to delete this course"});

    Courses.deleteCourse(req.body.username, function(err) {
      if(err)
        return res.json({success: false, msg: "Error in deleting the course"});

      return res.json({success: true, msg: "Course deleted successfully"});
    });
  });
});

router.get('/courses', function(req, res, next) {

  Courses.getCourses(function(err, courses) {
    if(err)
      return res.json({success: false, msg: "Server Error"});

    if(courses)
      return res.json({success: true, courses: courses});

    return res.json({success: false, msg: "No course in the catelog"});
  });
});

router.get('/details', function(req, res, next) {
  if(!req.query.courseno){
    return res.json({success: false, msg: "Can't find the details of given courseno"});
  }

  Courses.getCourseDetailsByCourseNo(req.query.courseno, function(err, course) {
    if(err)
      return res.json({success: false, msg: "Server Error"});

    if(course)
      return res.json({success: true, course: course});

    return res.json({success: false, msg: "Can't find details of the course with given course no"});
  });
});

router.get('/paid', function(req, res, next) {
	Courses.getPaidCourses(function(err, courses) {
		if(err)
			return res.json({success: false, msg: "Server Error."});

		if(!courses)
			return res.json({success: false, msg: "No paid course available at the moment"});

		return res.json({success: true, courses: courses});
	});
});

router.get('/free', function(req, res, next) {
	Courses.getFreeCourses(function(err, courses) {
		if(err)
			return res.json({success: false, msg: "Server Error"});

		if(!courses)
			return res.json({success: false, msg: "No free courses available at the moment"});

		return res.json({success: true, courses: courses});
	});
});

router.get('/popular', function(req, res, next) {
  Courses.getPopularCourses(function(err, courses) {
    if(err)
      return res.json({success: false, msg: "Server Error"});

    if(courses)
      return res.json({success: true, courses: courses});

    return res.json({success: false, msg: "Error in getting the list of courses"});
  });
});

router.get('/upcoming', function(req, res, next) {
	Courses.getUpcomingCourses(function(err, courses) {
		if(err)
			return res.json({success: false, msg: "Server Error"});

		if(!courses)
			return res.json({success: false, msg: "No upcoming courses"});

		return res.json({success: true, courses: courses});
	});
});

router.get('/getList', function(req, res, next) {
	Courses.getCourseList(function(err, courses) {
		if(err)
			return res.json({success: false, msg: "Server Error"});

		if(!courses)
			return res.json({success: false, msg: "No course in the catalog"});

		return res.json({success: true, courses: courses});
	});
});

module.exports = router;
