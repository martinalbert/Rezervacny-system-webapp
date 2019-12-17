const UbytovanyRepo = require('../models/repositories/UbytovanyRepo');

const createUser = function(req, res) {
  const user = req.body;
  console.log("req-body", req.body);
  console.log('attemping to create a user');
    
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