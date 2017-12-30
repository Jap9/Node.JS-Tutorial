const express = require('express');
const ProductControllers = require('../controllers/product');
const UserControllers = require('../controllers/user');
const auth = require('../middlewares/auth');
const api = express.Router();

api.get('/product', ProductControllers.getProducts);
api.get('/product/:productId', ProductControllers.getProduct);
api.post('/product', auth, ProductControllers.saveProduct);
api.put('/product/:productId', auth, ProductControllers.updateProduct);
api.delete('/product/:productId', auth, ProductControllers.deleteProduct);
api.post('/signup', UserControllers.signUp);
api.post('/signin', UserControllers.signIn);
api.get('/private', auth, (req, res) => {
	res.status(200).send({ message: "You have access" });
});

api.get('/health', (req, res) => {
	res.status(200).send({ message: "Server is up" });
});

module.exports = api;