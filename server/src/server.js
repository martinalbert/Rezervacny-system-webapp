const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
// create a server
const server = http.createServer(app);
const models = require('./models');
const eraseDBonSync = true;
var db = mongoose.connection;

models.connectDB()
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("we're connected");
    server.listen(port, (err) => {
        if (err) console.error(err.message)
        console.log('server started on port: ' + port);
    });
})