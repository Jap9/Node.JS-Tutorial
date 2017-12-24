const express = require('express');
const ProductControllers = require('../controllers/product');
const auth = require('../middlewares/auth');
const api = express.Router();

api.get('/product', ProductControllers.getProducts);
api.get('/product/:productId', ProductControllers.getProduct);
api.post('/product', ProductControllers.saveProduct);
api.put('/product/:productId', ProductControllers.updateProduct);
api.delete('/product/:productId', ProductControllers.deleteProduct);
api.get('/private', auth.isAuth, function(req, res) {
	res.status(200).send({ message: "You have access" });
});

module.exports = api;