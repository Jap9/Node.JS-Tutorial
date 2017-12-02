const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3000;

mongoose.connection.openUri('mongodb://localhost:27017/shop', (err, res) => {
	
	if(err) return console.log('Error al conectar a la MongoDB ' + err);
	console.log('Conexion MongoDB OK');

	app.listen(port, () => {
		console.log('API RESTful, port ' + port);
	});
});