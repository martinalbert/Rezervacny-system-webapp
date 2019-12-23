const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  login: {
    type: String,
    unique: true
  },
  meno: {
    type: String
  },
  priezvisko: {
    type: String
  },
  budova: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Budova'
  },

});

const Zamestnanec_internatov = mongoose.model('Zamestnanec_internatov', schema);
module.exports = Zamestnanec_internatov;
