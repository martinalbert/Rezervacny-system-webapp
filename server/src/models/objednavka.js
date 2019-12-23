const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  cas: {
    type: Number,
  },
  cena: {
    type: Number,
  },
  datum: {
    type: String
  },
  zaciatok: {
    type: String
  },
  koniec: {
    type: String
  },
  stav: {
    type: String
  },
  typ_platenia: {
    type: String
  },
  ubytovany: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Ubytovany'
  },
  izba: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Izba'
  },

});

const Objednavka = mongoose.model('Objednavka', schema);
module.exports = Objednavka;
