module.exports.roleAuthorization = function(roles) {
	var ret = function(req, res, next) {
		var user = req.user;

		if(user.err){
			res.json({success: false, msg: user.err});
			return next(' ');
		}

		if(roles.indexOf(user.type) > -1) {
			return next();
		}

		res.json({success: false, msg: "You are not authorized to access this api."});
		return next(' ');
	};

	return ret;
};
