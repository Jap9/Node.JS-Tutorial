
const mongoose = require('mongoose');
const User = require('../models/user');
const service = require('../services'); // "/index" is not needed.


// Get new user params brom request, save onto DB and retrieve the Token we just created on another Service.
function signUp(req, res) {

	const user = new User({
		email: req.body.mail,
		displayName: req.body.displayName
	});

	user.save((err) => {
		if(err) res.status(500).send({ message: "Error al crear el usuario " + err });
		return res.status(200).send({ token: service.createToken(user) });
	});
}

function signIn(req, res) {
	
}

module.exports = {
	signUp,
	signIn
};