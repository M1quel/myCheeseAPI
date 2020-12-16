module.exports = function(req, res, next) {
	if(!req.headers.authorization) {
		res.status(401);
		res.end();
		return;
	}

	if(req.headers.authorization != "Bearer " + process.env.TOKEN) {
		res.status(403);
		res.end();
		return;
	}

	next();
};