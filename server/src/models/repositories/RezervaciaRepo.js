const Rezervacia = require('../rezervacia');

class RezervaciaRepo {

  constructor(model) {
    this.model = model;
  }

  create(object) {
    return this.model.create(object);
  }
}

module.exports = new RezervaciaRepo(Rezervacia);
