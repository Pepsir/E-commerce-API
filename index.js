// E-Commerce API

// Express, Mongoose, Cors
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 4000;

// Resources to access backend application
app.use(express.json());
app.use(cors());

const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoutes");


// MongoDB connection

mongoose.connect("mongodb://admin:admin123@ac-wmymhej-shard-00-00.nrqarhn.mongodb.net:27017,ac-wmymhej-shard-00-01.nrqarhn.mongodb.net:27017,ac-wmymhej-shard-00-02.nrqarhn.mongodb.net:27017/?ssl=true&replicaSet=atlas-3su33x-shard-0&authSource=admin&retryWrites=true&w=majority",
	{
	useNewUrlParser: true,
	useUnifiedTopology: true
});

let db = mongoose.connection;


db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", () => console.log("We're connected to the cloud database"));

app.use("/users", userRoute);
app.use("/products", productRoute);

app.listen(port, () => console.log(`Now listening to port ${port}`));



