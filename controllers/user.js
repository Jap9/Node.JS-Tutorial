
const mongoose = require('mongoose');
const User = require('../models/user');
const service = require('../services'); // "/index" is not needed.


// Get new user params brom request, save onto DB and retrieve the Token we just created on another Service.
function signUp(req, res) {

	const user = new User({
		email: req.body.email,
		displayName: req.body.displayName,
		password: req.body.password
	});

	user.save((err) => {
		if(err) return res.status(500).send({ message: "Error al crear el usuario " + err });
		return res.status(200).send({ token: service.createToken(user), refreshToken: service.createRefreshToken(user)});
	});
}

// Find user in DB with this email and send Token in header.
function signIn(req, res) {
	User.find({ email: req.body.email }, (err, user) => {
		if(err) return res.status(500).send({ message: 'Error al realizar la petición ' + err });
		if(!user) return res.status(404).send({ message: 'No existe el usuario' });
		
		req.user = user;
		res.status(200).send({ 
			message: "Te has logueado correctamente",
			token: service.createToken(user)});
	});
}

// Get refresh Token in the params and generates another one if correct.
function refreshToken(req, res) {
	
	if(!req.body.refreshToken) return res.status(500).send({ message: 'Error missing field: refreshToken' });
	return res.status(200).send({ refreshToken: service.refreshToken(req.body.refreshToken) });
}

module.exports = {
	signUp,
	signIn,
	refreshToken
};