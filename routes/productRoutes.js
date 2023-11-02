const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const auth = require("../auth");


// Route for Retrieving all the product

router.get("/all", (req, res) => {
	productController.getAllProducts().then(result => res.send(result))
});


// Route for Retrieving all active product
router.get("/active/all", (req, res) => {
	productController.getActiveProducts().then(result => res.send(result))
});

// Route for retrieving a specific product
router.get("/:productId", (req, res) => {
	console.log(req.params.productId)

	productController.getProduct(req.params).then(result => {
		res.send(result)
	})
});


// Route for adding a product (admin only)
router.post("/add", (req, res) => {

	const userData = auth.decode(req.headers.authorization);

	productController.addProduct(req.body, {userId: userData.id, isAdmin: userData.isAdmin}).then(result => res.send(result))
});


// Route for updating a product (admin only)
router.put("/:productId", auth.verify, (req, res) => {

	const userData = auth.decode(req.headers.authorization);

	productController.updateProduct(req.params, req.body, userData).then(result => res.send(result))
});


// Route for archiving a product (admin only)
router.put("/archive/:productId", auth.verify, (req, res) => {

	// console.log(req.params)

	const data = {
		productId: req.params.productId,
		payload: auth.decode(req.headers.authorization).isAdmin
	}

	// console.log(data.payload)

	productController.archiveProduct(data, req.body).then(result => res.send(result))
});


module.exports = router;




