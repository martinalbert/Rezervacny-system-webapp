const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  datum_start: {
    type: Date,
    // // unique: true
    // min: new Date('YYYY/MM/DD')
  },
  cas_start: {
    type: String
  },
  cas: {
    type: Number
  },
  stav: {
    type: String
  },
  ubytovany: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Ubytovany',
  },
  izba: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Izba',
  },
  objednavka: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Objednavka',
  }
});

const Rezervacia = mongoose.model('Rezervacia', schema);
module.exports = Rezervacia;
