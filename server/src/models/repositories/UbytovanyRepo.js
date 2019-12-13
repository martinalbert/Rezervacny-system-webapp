const User = require('../Ubytovany');

class UbytovanyRepo {

  constructor(model) {
    this.model = model;
  }

  create(object) {
    return this.model.create(object);
  }
}

module.exports = new UbytovanyRepo(User);
