// Moment will be used when working with Dates.
const services = require('../services');

function isAuth (req, res, next) {
	if(!req.headers.authorization) {
		return res.status(403).send({ message: "No auth header" });
	}

	const token = req.headers.authorization.spit(" ")[1];

	service.decodeToken(token)
	.then(response => {
		req.user = response;
		next();
	})
	.catch(response => {
		res.status(response.status);
	});
}

module.exports = isAuth;