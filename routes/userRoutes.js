const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../auth");


// Route for User Registration

router.post("/register", (req, res) => {

	userController.registerUser(req.body).then(result => res.send(result))
});


// Route for verifying email has already existed

router.post("/checkEmailExists", (req, res) => {

	userController.checkEmailExists(req.body).then(result => res.send(result))
});


// Route for logging-in

router.post("/login", (req, res) => {

	userController.loginUser(req.body).then(result => res.send(result))
});


// Route for getting user details

router.get("/details", auth.verify, (req, res) => {

	const userData = auth.decode(req.headers.authorization);

	console.log(userData);
	userController.getProfile({id: userData.id}).then(result => res.send(result))
});

module.exports = router;

