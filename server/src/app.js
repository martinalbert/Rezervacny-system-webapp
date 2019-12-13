// package routes
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const ubytovanyRoutes = require('./routes/ubytovany');

// middlewares
app.use(morgan('dev'));
// SETTING FOLDER IMGS TO PUBLIC
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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

// Connect the routes
app.use('/ubytovany', ubytovanyRoutes);
module.exports = app;