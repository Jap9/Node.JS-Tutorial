const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

mongoose.connection.openUri(config.db, (err, res) => {
	
	if(err) return console.log('Error al conectar a la MongoDB ' + err);
	console.log('Conexion MongoDB OK');

	app.listen(config.port, () => {
		console.log('API RESTful, port ' + config.port);
	});
});