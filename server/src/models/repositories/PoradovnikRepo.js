const Poradovnik = require('../poradovnik');

class PoradovnikRepo {

  constructor(model) {
    this.model = model;
  }

  create(object) {
    return this.model.create(object);
  }
}

module.exports = new PoradovnikRepo(Poradovnik);
