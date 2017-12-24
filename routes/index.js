const express = require('express');
const ProductControllers = require('../controllers/product');
const UserControllers = require('../controllers/user');
const auth = require('../middlewares/auth');
const api = express.Router();

api.get('/product', ProductControllers.getProducts);
api.get('/product/:productId', ProductControllers.getProduct);
api.post('/product', ProductControllers.saveProduct);
api.post('/signup', UserControllers.signUp);
api.post('/signin', UserControllers.signIn);
api.put('/product/:productId', ProductControllers.updateProduct);
api.delete('/product/:productId', ProductControllers.deleteProduct);
api.get('/private', auth, (req, res) => {
	res.status(200).send({ message: "You have access" });
});

module.exports = api;