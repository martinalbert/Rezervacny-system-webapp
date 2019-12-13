const express = require('express');
const mongoose = require('mongoose');

// package routes
const http = require('http');
// file routes
const app = require('./app');

// set the port
const port = process.env.PORT || 3000;
// create a server
const server = http.createServer(app);
// listen to specific port
server.listen(port, (err) => {
   console.log('server started on port: ' + port);
});
