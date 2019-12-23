const Budova = require('../budova');

class BudovaRepo {

  constructor(model) {
    this.model = model;
  }

  create(object) {
    return this.model.create(object);
  }
}

module.exports = new BudovaRepo(Budova);
