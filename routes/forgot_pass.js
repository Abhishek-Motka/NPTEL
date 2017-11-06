var helper = require('sendgrid').mail;
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var passport = require('passport');
var auth = require('../scripts/authentication');
var express = require('express');
var bcrypt = require('bcryptjs');

var router = express.Router();

var User = require('../models/user');
var Token = require('../models/tokens');
var ForgetPass = require('../models/ForgetPass');

var config = require('../config/config');

var generatePassword = function() {
  var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890!@#$%^&*()_+{}[]|-=:';.,></?`~";
  var passLength = Math.floor(Math.random()*7)+8;
  var password = '';
  var len = chars.length;
  for(var i = 0; i < passLength; i++){
    var index = Math.floor(Math.random()*len);
    password += chars.charAt(index);
  }
  return password;
};

var sendEmail = function(email_to, hash, res) {
  var from_email = new helper.Email(config.EMAIL_ADDR, config.EMAIL_NAME);
  var to_email = new helper.Email(email_to);
  var subject = ' ';
  var content = new helper.Content('text/html', ' ');
  var mail = new helper.Mail(from_email, subject, to_email, content);

  mail.personalizations[0].addSubstitution(
    new helper.Substitution('-link-', config.CONFIRM_PASS_URL+hash)
  );

	mail.personalizations[0].addSubstitution(
	  new helper.Substitution('-linkName-', config.RESET_LINK_NAME)
  );

  mail.setTemplateId(config.SENDGRID_TEMPLATE_ID);

  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  });

  sg.API(request, function(error, response) {
	   if(error){
		     return res.json({success: false, msg: "Error in sending email."});
	   }
	   return res.json({success: true, msg: "Email sent to your email address."});
  });
};

router.post('/sendEmail', function(req, res, next){

  if(!req.body.email) {
    return res.json({success: false, msg: "Please send valid email address."});
  }

  User.getUserByEmail(req.body.email, function(err, user) {
    if(err) {
      return res.json({success: false, msg: "Server Error."});
    }

    if(!user) {
      return res.json({success: false, msg: "Email address doesn't exist."});
    }else{
      var password = generatePassword();

      ForgetPass.getByUsername(user.username, function(err, hashObject) {
        if(err) throw err;

        bcrypt.genSalt(10, function(err, salt){
    			if(err) throw err;
    			bcrypt.hash(password, salt, function(err, hash){
    				if(err) throw err;

            if(!hash)
              return res.json({success: false, msg: "Server Error."});

            bcrypt.genSalt(10, function(err, userSalt) {
              if(err) throw err;
              bcrypt.hash(user.username, userSalt, function(err, userHash) {
                if(err) throw err;

                if(!userHash)
                  return res.json({success: false, msg: "Server Error."});

                var newHash = '';
                for(var i = 0; i < hash.length && i < userHash.length; i++)
                  newHash += hash.charAt(i)+''+userHash.charAt(i);

                var newObject = {
                  username: user.username,
                  hashedPassword: hash,
                  usernameHash: userHash
                };

                var token = new Token({
          				username: user.username,
          				exp: new Date().getTime()
          			});

                try{
                  Token.getTokenByUsername(user.username, function(errToken, tokenRes) {
                    if(err) throw err;
                    if(!tokenRes){
                      Token.addToken(token, function(errSession, token) {
                        if(errSession) throw errSession;
                      });
                    }
                  });
                }catch(errSess){ }

                if(hashObject){
                  ForgetPass.updateByUsername(user.username, newObject, function(err, updatedObject) {
                    if(err) throw err;

                    if(!updatedObject) {
                      return res.json({success: false, msg: "Error in sending email."});
                    }else{
                      return sendEmail(user.email, newHash, res);
                    }
                  });
                }else{
                  newObject = new ForgetPass(newObject);
                  ForgetPass.addForgotPass(newObject, function(err, object) {
                    if(err) throw err;

                    if(!object) {
                      return res.json({success: false, msg: "Error in sending email."});
                    }else{
                      return sendEmail(user.email, newHash, res);
                    }
                  });
                }
              });
            });

    			});
    		});
      });
    }
  });
});

router.post('/verify', function(req, res, next) {
  if(!req.body.hash) {
    return res.json({success: false, msg: "Invalid Request."});
  }

  var password_hash = '', user_hash = '';

  var len = req.body.hash.length;

  for(var i = 0; i < len; i++){
    password_hash += req.body.hash.charAt(i++);
    user_hash += req.body.hash.charAt(i);
  }

  ForgetPass.getUsername(password_hash, user_hash, function(err, object) {
    if(err) throw err;

    if(!object) {
      return res.json({success: false, msg: "This link is not valid."});
    }else {
      return res.json({success: true, msg: "This link is valid"});
    }
  });
});

router.post('/resetPassword', function(req, res, next) {
    if(!req.body.hash || !req.body.password) {
      return res.json({success: false, msg: "Invalid Request."});
    }

    var password_hash = '', user_hash = '';

    var len = req.body.hash.length;

    for(var i = 0; i < len; i++){
      password_hash += req.body.hash.charAt(i++);
      user_hash += req.body.hash.charAt(i);
    }

    ForgetPass.getUsername(password_hash, user_hash, function(err, object) {
      if(err) throw err;

      if(!object){
        return res.json({success: false, msg: "Error in reseting password."});
      }else {
        ForgetPass.deleteByUsername(object.username, function(err) {
          if(err) {
            return res.json({success: false, msg: "Error in reseting password."});
          }

          User.updatePassword(object.username, req.body.password, function(err, updatedUser) {
            if(err) throw err;

            if(!updatedUser){
              return res.json({success: false, msg: "Error in reseting password."});
            }else{
              return res.json({success: true, msg: "password reseted successfully."});
            }
          });
        });
      }
    });
});

module.exports = router;
