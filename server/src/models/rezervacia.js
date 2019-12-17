const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  datum_start: {
    type: String,
    // unique: true
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
    ref: 'Ubytovany'
  },
  izba: {
    type: Number
  },
  objednavka: {
    type: Boolean
  }
//   rezervacie, dokoncene_rezervacie, poradovniky
});

const Rezervacia = mongoose.model('Rezervácia', schema);
module.exports = Rezervacia;
