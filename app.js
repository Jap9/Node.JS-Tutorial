const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const ProductControllers = require('./controllers/product');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/product', ProductControllers.getProducts);
app.get('/api/product/:productId', ProductControllers.getProduct);
app.post('/api/product', ProductControllers.saveProduct);
app.put('/api/product/:productId', ProductControllers.updateProduct);
app.delete('/api/product/:productId', ProductControllers.deleteProduct);

module.exports = app;