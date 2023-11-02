const User = require("../models/User");
const Product = require("../models/Product");
const bcrypt = require("bcrypt");
const auth = require("../auth");


// User Registration

module.exports.registerUser = (reqBody) => {

	let newUser = new User({
		firstName: reqBody.firstName,
		lastName: reqBody.lastName,
		email: reqBody.email,
		password: bcrypt.hashSync(reqBody.password, 10),
		isAdmin: reqBody.isAdmin
	});
	
	
		return newUser.save().then((user, error) => {
			if (error){
				return false 
			} else {
				return true
			}
	})
};


// Check if email has already existed

module.exports.checkEmailExists = (reqBody) => {

	return User.find({email: reqBody.email}).then(result => {
		if (result.length > 0){
			return true 
		} else {
			return false 
		}
	})
};


// User Authentication
module.exports.loginUser = (reqBody) => {

	return User.findOne({email: reqBody.email}).then(result => {
		if(result == null) {
			return false 
		} else {
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);

			if (isPasswordCorrect){
				return {access: auth.createAccessToken(result)}
			} else {
				return false
			}
		}
	})
};



// Retrieve User Details
module.exports.getProfile = (data) => {
	return User.findById(data.id).then(result => {
		return result
	})
}