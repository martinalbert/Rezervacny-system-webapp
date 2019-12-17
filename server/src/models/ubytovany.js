const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  meno: {
    type: String
  },
  priezvisko: {
    type: String
  },
  login: {
    type: String
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
  rezervacie: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Rezervacia'
  }, 
  dokoncene_rezervacie: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Rezervacia'
  }, 
  // poradovniky: {

  // }
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

const Ubytovany = mongoose.model('Ubytovaný', schema);
module.exports = Ubytovany;
