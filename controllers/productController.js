const Product = require("../models/Product");
const User = require("../models/User");

// Add Product (admin only)

module.exports.addProduct = (reqBody, userData) => {

	return User.findById(userData.userId).then(result => {

		if (userData.isAdmin == false){
			return false 
		} else {
			let newProduct = new Product({
				name: reqBody.name,
				description: reqBody.description,
				price: reqBody.price 
			})

			return newProduct.save().then((product, error) => {
				
				if(error) {
					// If product creation fails
					return false 
				} else {
					// If product creation successful
					return true
				}
			})
		}
	});
}


// Retrieve all active Products

module.exports.getActiveProducts = () => {
	return Product.find({isActive: true}).then(result => {
		return result 
	})
};


// Retrive All Products (even inactive products)

module.exports.getAllProducts = () => {
	return Product.find().then(result => {
		return result
	})
}


// Retrieve a Specific Product 

module.exports.getProduct = (reqParams) => {
	return Product.findById(reqParams.productId).then(result => {
		return result
	});
}



// Update Product Information (Admin Only)

module.exports.updateProduct = (reqParams, reqBody, data) => {

	return User.findById(data.id).then(result => {

		if (result.isAdmin == true){

			let updatedProduct = {
				name: reqBody.name,
				description: reqBody.description,
				price: reqBody.price 
			};

		return Product.findByIdAndUpdate(reqParams.productId, updatedProduct).then((product, error) => {

			if(error){
				// if Product failed to update
				return false 
			} else {
				// if Product successfully updated
			} return true 
		})

		} else {
			// If user is not Admin
			return false
		}
	})
};


// Archive Product (admin only)

module.exports.archiveProduct = (data, reqBody) => {

	return Product.findById(data.productId).then(result => {

		if (data.payload === true){

			let updateActiveField = {
				isActive: reqBody.isActive 
			}

			return Product.findByIdAndUpdate(result._id, updateActiveField).then((product, err) => {

				if(err){
					return false;
				} else {
					return true;
				}
			})
		} else {
			return false 
		}
	})
};


