const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  nazov: {
    type: String,
    unique: true
  },
  pocet_miestnosti: {
    type: Number
  },
  pocet_poschodi: {
    type: Number
  },
  mozem_vyzdvihnut: {
    type: Boolean
  },

});

const Budova = mongoose.model('Budova', schema);
module.exports = Budova;
