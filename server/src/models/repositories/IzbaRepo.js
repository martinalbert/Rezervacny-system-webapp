const Izba = require('../izba');

class IzbaRepo {

  constructor(model) {
    this.model = model;
  }

  create(object) {
    return this.model.create(object);
  }
}

module.exports = new IzbaRepo(Izba);
