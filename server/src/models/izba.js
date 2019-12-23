const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  nazov: {
    type: String,
    unique: true,
    match: /\w{1}\d{2}\d{2}/
  },
  poschodie: {
    type: Number
  },
  rezervovana: {
    type: Boolean
  },
  max_rez_doba: {
    type: Number
  },
  budova: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Budova'
  },
  typ: {
    type: String
  },

});

const Izba = mongoose.model('Izba', schema);
module.exports = Izba;