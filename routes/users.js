var passport = require('passport');
var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../config/database');
var auth = require('../scripts/authentication');

var User = require('../models/user');
var Token = require('../models/tokens');

var router = express.Router();

//Route for REGISTER
//Only logged in admin can register new user.
router.post('/register', function(req, res, next){

	//Create user object from the request body
	var newUser = new User({
		username: req.body.username,
		email: req.body.email,
		type: req.body.type,
		password: req.body.password,
		firstname: req.body.fname,
		lastname: req.body.lname,
		mobile: req.body.mobile
	});

	//Check if user with same username exists
	User.getUserByUsername(newUser.username, function(err, user){
		if(err) {
			return res.status(500).json({success: false, msg: "Server Error."});
		}

		//If user exists, registration fails
		if(user) {
			return res.json({success: false, msg: 'This username already exists.'});
		}

		//Check if user with same email address exists
		User.getUserByEmail(newUser.email, function(err, user){
			if(err) {
				return res.status(500).json({success: false, msg: "Server Error."});
			}

			//If exists, registration fails
			if(user) {
				return res.json({success: false, msg: "User with same email address exists."});
			}

			//If everything is ok then try to register the user
			User.addUser(newUser, function(err, user) {

				//Failed due to server error
				if(err){
					return res.json({success: false, msg:'Failed to register user. Same user may exist.'});
				}else{
					//Successfully registered
					return res.json({success: true, msg: 'User Registered'});
				}
			});
		});
	});
});

router.get('/validate', passport.authenticate('jwt', {session: false}), function(req, res, next){
	if(req.user.err)
		return res.status(401).json({success: false, msg: req.user.err});
	else
		return res.json({success: true});
});

//Route for Authentication
router.post('/authenticate', function(req, res, next){

	//Extract username and password from the request body
	var username = req.body.username;
	var password = req.body.password;

	//Find the user with the same username
	User.getUserByUsername(username, function(err, user){
		if(err) {
			return res.status(500).json({success: false, msg: "Server Error."});
		}

		//If user not found, then login fails.
		if(!user){
			return res.json({success: false, msg: "Invalid Username or Password."});
		}

		//If user found, compare the actual password and the password sent in the request
		User.comparePassword(password, user.password, function(err, isMatch) {
				if(err) {
					return res.status(500).json({success: false, msg: "Server Error."});
				}

				//console.log(user);

				//If matches then create a jwt token and send the token with userr information(without password)
				if(isMatch){
					var token = jwt.sign(user.toObject(), config.secret, {
						expiresIn: 604800, //1 week
					});

					Token.removeToken(user.username, function(err){
						if(err) {
							return res.json({success: false, msg: "Error in session management."});
						}
					});

					res.json({
						success: true,
						token: 'JWT '+token,
						msg: "You are logged in.",
						user: {
							id: user._id,
							email: user.email,
							username: user.username,
							type: user.type,
							firstname: user.firstname,
							lastname: user.lastname,
							mobile: user.mobile
						}
					});
				}else {
					return res.json({success: false, msg: "Invalid Username or Password."});
				}
		});
	});
});

router.delete('/delete', passport.authenticate('jwt', {session: false}), auth.roleAuthorization(['admin']), function(req, res, next){

	var username = req.body.username;

	if(!username){
		return res.json({success: false, msg: "Unable to delete the user"});
	}

	User.deleteUser(username, function(err) {
		if(err){
			return res.json({success: false, msg: "Error in deleting the user."});
		}

		return res.json({success: true, msg: "User deleted successfully"});
	});
});

//route to update user password
router.post('/updatePassword', passport.authenticate('jwt', {session: false}), function(req, res, next) {
	//If required parameters don't exist then invalid request
	if(!req.body.username || !req.body.newPassword || !req.body.password){
		return res.json({success: false, msg: 'Unable to update password'});
	}

	//User can update his/her password only
	if(req.user.username === req.body.username){

		User.getUserByUsername(req.body.username, function(err, user){
			if(err) {
				return res.status(500).json({success: false, msg: "Server Error."});
			}

			//If user with specified username doesn't exist then update fails
			if(!user){
				return res.json({success: false, msg: "Invalid username or password."});
			}else{
				//Compare oldpassword with the password in the request (must match)
				User.comparePassword(req.body.password, user.password, function(err, isMatch) {
					if(err) {
						return res.status(500).json({success: false, msg: "Server Error."});
					}

					if(!isMatch){
						return res.json({success: false, msg: "Old password doesn't match"});
					}else{
						//If old password matches then update the password
						User.updatePassword(req.body.username, req.body.newPassword, function(err, updatedUser){
							if(err) {
								return res.json({success: false, msg: "Error in updating password."});
							}

							if(!updatedUser){
								return res.json({success: false, msg:"Error in updating the password."});
							}else{
								var tokenNew = {
									username: req.body.username,
									exp: new Date().getTime()
								};

								Token.getTokenByUsername(tokenNew.username, function(err, token) {
									if(err)
										return res.status(500).json({success: false, msg: "Server Error"});

									if(!token){
										tokenNew = new Token(tokenNew);
										Token.addToken(tokenNew, function(err, token) {
											if(err) {
												return res.json({success: false, msg: "Something went wrong in session management."});
											}

											if(!token){
												return res.json({success: false, msg:"Error in session management."});
											}else{
												return res.json({success: true, msg:"Password updated successfully."});
											}
										});
									}else{
										Token.updateToken(tokenNew.username, token, function(err, tokenUpdated) {
											if(err)
												return res.status(500).json({success: false, msg: "Server Error."});

											if(!tokenUpdated)
												return res.json({success: false, msg: "Error in session management"});

											return res.json({success: true, msg:"Password updated successfully."});
										})
									}
								});
							}
						});
					}
				});
			}
		});
	}else{
		return res.json({success: false, msg: "You are not authorized to update the password."});
	}
});

router.get('/getInstructors', function(req, res, next) {
	User.getInstructors(function(err, instructors) {
		if(err) {
			return res.json({success: false, msg: "Server Error"});
		}

		return res.json({success: true, ins: instructors});
	});
});

router.get('/profile', passport.authenticate('jwt', {session: false}), function(req, res, next) {
	var username = req.user.username;

	User.getUserByUsername(username, function(err, user) {
		if(err)
			return res.json({success: false, msg: "Server Error"});

		if(!user)
			return res.json({success: false, msg: "User with given username doesn't exist"});

		return res.json({success: true, user: user});
	});
});

router.get('/logout', passport.authenticate('jwt', {session: false}), function(req, res, next) {
	var tokenNew = {
		username: req.user.username,
		exp: new Date().getTime()
	};

	Token.getTokenByUsername(tokenNew.username, function(err, token) {
		if(err)
			return res.status(500).json({success: false, msg: "Server Error"});

		if(!token){
			tokenNew = new Token(tokenNew);
			Token.addToken(tokenNew, function(err, token) {
				if(err) {
					return res.json({success: false, msg: "Something went wrong in session management."});
				}

				if(!token){
					return res.json({success: false, msg:"Error in session management."});
				}else{
					return res.json({success: true, msg:"You are logged out."});
				}
			});
		}else{
			Token.updateToken(tokenNew.username, tokenNew, function(err, tokenUpdated) {
				if(err)
					return res.status(500).json({success: false, msg: "Server Error."});

				if(!tokenUpdated)
					return res.json({success: false, msg: "Error in session management"});

				return res.json({success: true, msg:"You are logged out."});
			})
		}
	});
});

module.exports = router;
