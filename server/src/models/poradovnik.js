const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  dlzka: {
    type: Number,
  },
  est_prazdny: {
    type: Number,
  },
//   ARRAYLISTY
  ubytovany: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Ubytovany'
  },
  rezervacie: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Rezervacia'
  },

});

const Poradovnik = mongoose.model('Poradovnik', schema);
module.exports = Poradovnik;
