// Moment will be used when working with Dates.
const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

function createToken (user) {

	// "id" should be different than MongoDB.
	const payload = { 
		sub: user._id,
		iat: moment().unix(),
		exp: moment().add(14, 'days').unix(),
	};

	return jwt.encode(payload, config.SECRET_TOKEN);
}

module.exports = createToken;