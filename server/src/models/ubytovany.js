const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /\w{3}\d{4}@vsb.cz/
  },
  meno: {
    type: String,
    required: true,
  },
  priezvisko: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    match: /\w{3}\d{4}/
  },
  password: {
    type: String
  },
  spolahlivost: {
    type: Number
  },
  inkaso: {
    type: Boolean
  },
  preferencie: {
    type: String
  },
  // preferencie: {
  //   type: mongoose.Schema.Types.ObjectId, 
  //   ref: 'Preferencie',
  // },
  rezervacie: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Rezervacia'
  }], 
  dokoncene_rezervacie: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Objednavka'
  }], 
  poradovniky: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poradovnik'
  }],
});

// - templates for pre & post function of scheme
// schema.pre('save', function(next) {
//   console.log('calling next');
//   next();
//   console.log('after next');
// });
// schema.post('save', function(next) {
//   console.log('calling next');
//   next();
//   console.log('after next');
// });

const Ubytovany = mongoose.model('Ubytovany', schema);
module.exports = Ubytovany;
