
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

// "select: false" prevents sending password on every SELECT.
const UserSchema = Schema({
	email: { type: String, unique: true, lowercase: true },
	displayName: String,
	avatar: String,
	password: { type: String, select: false },
	signupDate: { type: Date, default: Date.now() },
	lastLogin: Date
});

// Execute something before data is stored in DB.
UserSchema.pre('save', function(next) {
	
	// Hash the password if it has been modified (or is new)
	if(!this.isModified('password')) return next();
	
	// Generate salt and check if error.
	bcrypt.genSalt(10, (err, salt) =>{
		if(err) return next(err);	

		// Hash password and check if error.
		bcrypt.hash(this.password, salt, null, (err, hash) => {
			if(err) return next(err);

			this.password = hash;
			next();
		});	
	});
});

UserSchema.methods.gravatar = function() {
	// Check if email exists, return default avatar if not.
	if(!this.email) return "https://gravatar.com/avatar/?s=200&d=retro";

	// Get avatar associated to user's email using "gravatar" API.
	const md5 = crypto.createHash('md5').update(this.email).digest('hex');
	return "https://gravatar.com/avatar/"+ md5 +"?s=200&d=retro";
};

module.exports = mongoose.model('User', UserSchema);