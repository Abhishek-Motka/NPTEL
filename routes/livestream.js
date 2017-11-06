var express = require('express');
var config = require('../config/database');
var passport = require('passport');
var auth = require('../scripts/authentication');

var LStream = require('../models/livestreams');

var router = express.Router();

//Route for REGISTER
//Only logged in admin can register new user.
router.post('/add', passport.authenticate('jwt',{session: false}), auth.roleAuthorization(['instructor']), function(req, res, next){

	//Create user object from the request body
	var newLStream = new LStream({
		courseno: req.body.courseno,
    embedcode: req.body.code,
    username: req.user.username
	});

	//Check if user with same username exists
	LStream.getByCourseno(newLStream.courseno, function(err, lstream){
		if(err) {
			return res.status(500).json({success: false, msg: "Server Error."});
		}

		//If instructor exists, registration fails
		if(lstream) {
			return res.json({success: false, msg: 'You are already live'});
		}

    LStream.addLStream(newLStream, function(err, addedStream) {

      //Failed due to server error
      if(err){
        return res.json({success: false, msg:'Failed to share a live streaming'});
      }else if(addedStream){
        //Successfully registered
        return res.json({success: true, msg: 'You are live now.'});
      }else{
        return res.json({success: false, msg: "Live streaming can not be shared."});
      }
    });
	});
});

router.delete('/delete', passport.authenticate('jwt', {session: false}), auth.roleAuthorization(['instructor']), function(req, res, next) {

  if(!req.body.username) {
    res.json({success: false, msg: "Error in stopping the live stream."});
  }

  LStream.deleteByUsername(req.body.username, function(err) {
    if(err)
      return res.json({success: false, msg: "You are offline."});

    return res.json({success: true, msg: "Live Streaming stopped Successfully"});
  });
});

router.get('/livestream', function(req, res, next) {

  if(!req.query.courseno)
    return res.json({success: false, msg: "Invalid request"});

  LStream.getByCourseno(req.query.courseno, function(err, lstream) {
    if(err)
      return res.json({success: false, msg: "Server Error"});

    if(lstream)
      return res.json({success: true, stream: lstream});

    return res.json({success: false, msg: "No live session for this course."});
  });
});

router.get('/getByInstructor', passport.authenticate('jwt',{session: false}), function(req, res, next) {
  LStream.getLStreamByInstructor(req.user.username, function(err, stream) {
    if(err)
      return res.json({success: false, msg: "Server Error"});

    if(stream)
      return res.json({success: true, stream: stream});

    return res.json({success: false, msg: "Unable to connect to the live stream"});
  });
});

router.get('/all', passport.authenticate('jwt',{session: false}), function(req, res, next) {
  LStream.getAllStream(function(err, streams){
    if(err)
      return res.json({success: false, msg:"Server Error"});

    if(!streams)
      return res.json({success: false, msg: "There is no instructor live"});

    return res.json({success: true, streams: streams});
  });
});

module.exports = router;
