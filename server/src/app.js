// package routes
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const ubytovany_routes = require('./routes/ubytovany');
const rezervacia_routes = require('./routes/rezervacia');
const sampleData_routes = require('./routes/sampleData');
const budova_routes = require('./routes/budova');
const izba_routes = require('./routes/izba');
const objednavka_routes = require('./routes/objednavka');
const poradovnik_routes = require('./routes/poradovnik');
const zamestnanec_routes = require('./routes/zamestnanec_internatov');

// middlewares
app.use(morgan('dev'));
// SETTING FOLDER IMGS TO PUBLIC
// app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

// Access Control Allow Origin
// Basic Headers
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	
	if(req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
})
app.get('/', function(req, res) {
	res.status(200).send('Hello World!');
});  

// Connect the routes
app.use('/ubytovany', ubytovany_routes);
app.use('/rezervacie', rezervacia_routes)
app.use('/izby', izba_routes);
app.use('/budovy', budova_routes);
app.use('/objednavky', objednavka_routes);
app.use('/poradovniky', poradovnik_routes);
app.use('/zamestnanci', zamestnanec_routes);

// create sample data
app.use('/generate', sampleData_routes);

module.exports = app;