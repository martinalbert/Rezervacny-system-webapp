const Zamestnanec_internatov = require('../zamestnanec_internatov');

class Zamestnanec_internatovRepo {

  constructor(model) {
    this.model = model;
  }

  create(object) {
    return this.model.create(object);
  }
}

module.exports = new Zamestnanec_internatovRepo(Zamestnanec_internatov);
