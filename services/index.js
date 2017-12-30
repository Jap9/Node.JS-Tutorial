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

function createRefreshToken (user) {

	//var refreshToken = user._id.toString() + '.' + crypto.randomBytes(40).toString('hex');
	//return refreshToken;
	return {};
}

function decodeToken(token) {
	const decoded = new Promise((resolve, reject) => {

		try {
			const payload = jwt.decode(token, config.SECRET_TOKEN);
			if(payload.exp <= moment().unix()) {
				reject({
					status: 401,
					message: 'Expired Token'
				}); 
			}
			resolve(payload.sub);

		} catch (err) {
			reject({
				status: 500,
				message: 'Invalid Token'
			});
		}
	});

	return decoded;
}



function refreshToken(token) {

	return { message: "Not implemented yet." };
}

module.exports = {
	createToken,
	decodeToken,
	createRefreshToken,
	refreshToken
};