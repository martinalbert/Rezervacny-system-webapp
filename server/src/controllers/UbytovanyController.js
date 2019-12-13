const UbytovanyRepo = require('../models/repositories/UbytovanyRepo');

function createUser(req, res) {
  const user = req.body;
  console.log('hello');
  UbytovanyRepo.create(user)
    .then((newUser) => {
      res.json(newUser);
    }).catch((errors) => {
      res.status(500).json({
        errors,
      });
    });
}

module.exports = createUser;