const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  email: {
    type: String
  },
  password: {
    type: String
  }
});

const Ubytovany = mongoose.model('Ubytovaný', schema);
module.exports = Ubytovany;
