const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

	firstName : {
		type: String,
		required: [true, "First name is required"]
	},

	lastName : {
		type: String,
		required: [true, "Last name is required"]
	},

	password: {
		type: String,
		required: [true, "Password is required"]
	},

	email: {
		type: String,
		required: [true, "Email is required"]
	},

	isAdmin: {
		type: Boolean,
		default: false
	}
})

module.exports = mongoose.model("User", userSchema);

