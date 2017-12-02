const express = require('express');
const ProductControllers = require('../controllers/product');
const api = express.Router();

api.get('/product', ProductControllers.getProducts);
api.get('/product/:productId', ProductControllers.getProduct);
api.post('/product', ProductControllers.saveProduct);
api.put('/product/:productId', ProductControllers.updateProduct);
api.delete('/product/:productId', ProductControllers.deleteProduct);

module.exports = api;