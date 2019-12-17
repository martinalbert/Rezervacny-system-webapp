const mongoose = require('mongoose');

const connectDB = () => {
	console.log('attemping to connect to mongoose');
	return mongoose.connect("mongodb+srv://dbAdmin:" + process.env.MONGO_ATLAS_PW + "@vis-cluster-vhczk.mongodb.net/Reservation_system?retryWrites=true&w=majority", 
	{
		useNewUrlParser: true,
		useFindAndModify: false,
		useCreateIndex: true,
		useUnifiedTopology: true
	});
}

const Rezervacia = require('./rezervacia');
const Ubytovany = require('./ubytovany');
const models = {Rezervacia, Ubytovany};

module.exports.connectDB = connectDB;
module.exports.models = models;