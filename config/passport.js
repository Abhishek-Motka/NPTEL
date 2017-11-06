var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var dbConfig = require('./database');

var User = require('../models/user');
var Token = require('../models/tokens');

module.exports = function(passport) {
	var opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
	opts.secretOrKey = dbConfig.secret;
	passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
		Token.getTokenByUsername(jwt_payload.username, function(err, token) {
			if(err){
				var user = {};
				user.err = err.message;
				return done(null, user);
			}

			if(!token) {
				User.getUserByUsername(jwt_payload.username, function(err, user){
					if(err){
						var user = {};
						user.err = err.message;
						return done(null, user);
					}
					if(user)
						return done(null, user);
					else{
						var user = {};
						user.err = "User Not Found.";
						return done(null, user);
					}
				});
			}

			if(token !== null && token.exp < jwt_payload.exp) {

				Token.removeToken(jwt_payload.username, function(err){
					if(err){
						var user = {};
						user.err = "Error in session management.";
						return done(null, user);
					}
					User.getUserByUsername(jwt_payload.username, function(err, user){
						if(err){
							var user = {};
							user.err = err.message;
							return done(null, user);
						}
						if(user)
							return done(null, user);
						else{
							var user = {};
							user.err = "User not Found.";
							return done(null, user);
						}
					});
				});
			}else if(token !== null && token.exp >= jwt_payload.exp){
				var user = {};
				user.err = "Session is expired.";
				return done(null, user, "Session is expired.");
			}
		});
	}));
};
