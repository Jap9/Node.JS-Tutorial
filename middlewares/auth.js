// Moment will be used when working with Dates.
const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

function isAuth (req, res, next) {
	if(!req.headers.authorization) {
		return res.status(403).send({ message: "No auth header" });
	}

	const token = req.headers.authorization.spit(" ")[1];

	const payload = jwt.decode(token, config.SECRET_TOKEN);

	if(payload.exp <= moment().unix()) {
		return res.status(401).send({ message: "Token expired" });
	}

	// User payload to the plain user.
	req.user = payload.sub;
	next();
}

module.exports = isAuth;