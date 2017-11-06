var express = require('express');
var config = require('../config/database');
var passport = require('passport');
var auth = require('../scripts/authentication');

var Instructor = require('../models/instructors');

var router = express.Router();

//Route for REGISTER
//Only logged in admin can register new user.
router.post('/add', passport.authenticate('jwt',{session: false}), auth.roleAuthorization(['admin']), function(req, res, next){

	//Create user object from the request body
	var newInstructor = new Instructor({
		username: req.body.username,
    clg: req.body.clg,
    dob: req.body.dob,
    gender: req.body.gender,
    qualifications: req.body.qly,
    experience: req.body.experience
	});

	//Check if user with same username exists
	Instructor.getInstructorByUsername(newInstructor.username, function(err, instructor){
		if(err) {
			return res.status(500).json({success: false, msg: "Server Error."});
		}

		//If instructor exists, registration fails
		if(instructor) {
			return res.json({success: false, msg: 'Instructor with same username already exists.'});
		}

    Instructor.addInstructor(newInstructor, function(err, instructor) {

      //Failed due to server error
      if(err){
        return res.json({success: false, msg:'Failed to register the instructor. Same instructor may exist.'});
      }else if(instructor){
        //Successfully registered
        return res.json({success: true, msg: 'Instructor Registered'});
      }else{
        return res.json({success: false, msg: "Instructor can not be registred"});
      }
    });
	});
});

router.post('/update', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  if(!req.body.username){
    return res.json({success: false, msg: "Username is required for the update"});
  }

  var newInstructor = {};
  newInstructor.username = req.body.username;

  if(req.body.clg)
    newInstructor.clg = req.body.clg;
  if(req.body.qly)
    newInstructor.qualifications = req.body.qly;
  if(req.body.experience)
    newInstructor.experience = req.body.experience;

  if(req.user.username !== req.body.username && req.user.type !== 'admin'){
    return res.json({success: false, msg: "You are not able to update the details"});
  }

  Instructor.updateInstructor(req.body.username, newInstructor, function(err, updatedInstructor) {
    if(err){
      return res.json({success: false, msg: "You are not allowed to update the details"});
    }

    if(!updatedInstructor){
      return res.json({success: false, msg: "Details of the instructor is not updated"});
    }else{
      return res.json({success: true, msg: "Details are updated successfully"});
    }
  });
});

router.get('/profile', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  var username = req.user.username;

  Instructor.getInstructorByUsername(username, function(err, instructor) {
    if(err)
      return res.json({success: false, msg: "Server Error"});

    if(instructor)
      return res.json({success: true, ins: instructor});

    return res.json({success: false, msg: "Instructor with given username doesn't exist"});
  });
});

module.exports = router;
