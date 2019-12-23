const Objednavka = require('../objednavka');

class ObjednavkaRepo {

  constructor(model) {
    this.model = model;
  }

  create(object) {
    return this.model.create(object);
  }
}

module.exports = new ObjednavkaRepo(Objednavka);
