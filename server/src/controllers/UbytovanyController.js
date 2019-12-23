const UbytovanyRepo = require('../models/repositories/UbytovanyRepo');
const Ubytovany = require('../models/ubytovany');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config');

///////////////////
//	POST
// 	POST A USER
const createUser = function(req, res) {
  const myData = req.body;
    
  UbytovanyRepo.create(myData)
    .then((data) => {
      res.json(data);
    }).catch((errors) => {
      res.status(500).json({
        errors,
      });
    });
  
}


///////////////////
//	POST
// 	SIGN IN
const user_signup = (req, res, next) => {
	Ubytovany.find({ email: req.body.email })
	.exec()
	.then(ubytovany => {
		if (ubytovany.length >= 1) {
			return res.status(409).json({
				message: "Mail exists"
			});
		} else {
			bcrypt.hash(req.body.password, 10, (err, hash) => {
				if( err ) {
					return res.status(500).json({
						error: err
					});
				} else {
					const novy_ubytovany = new Ubytovany({
						_id: new mongoose.Types.ObjectId(),
            			email: req.body.email,
						meno: req.body.meno,
						priezvisko: req.body.priezvisko,
						login: req.body.login,
						password: hash
					});
					novy_ubytovany.save()
					.then(result => {
						res.status(201).json({
							message: 'Ubytovany created'
						})
					})
					.catch( err => {
						res.status(500).json({
							error: err
						})
					});
				}
			});
		}
	})	
};

///////////////////
//	POST
// 	LOGIN IN
const user_login = (req, res, next) => {

	Ubytovany.find({ "email": req.body.email })
	.exec()
	.then(ubytovany => {
		if(ubytovany.length < 1) {
			return res.status(401).json({
				message: "Auth Failed"
			})
		}
		bcrypt.compare(req.body.password, ubytovany[0].password, (err, result) => {
			if (err) {
				res.status(500).json({
					error: err
				});
			}
			if (result) {
				////////////////
				// TOKEN
				const token = jwt.sign({
					email: ubytovany[0].email,
					userId: ubytovany[0]._id
				}, 
				process.env.JWT_KEY, 
				{
					expiresIn: "1h"
				});
				return res.status(200).json({
					message: 'Auth Successful',
					token: token,
					userID: ubytovany[0]._id
				});
			}
			res.status(401).json({
				message: 'Auth failed'
			});
		});
	})
	.catch(err => {
		res.status(500).json({
			error: err
		})
	});
};


///////////////////
//	GET
// 	GET ALL USERS
const user_get_all = function(req, res) {
	Ubytovany.find()
	.populate('rezervacie')
	.exec()
	.then(ubytovany => {
	  const response = {
		Users: ubytovany.map(ubyt => {
		  return {
			ubytovany: ubyt,
			request: {
				type: 'GET',
				url: 'http://localhost:3000/ubytovany/' + ubyt._id
			}
		  }
		})
	  }
	  if(ubytovany.length >= 0) {
		res.status(200).json(response);
	  } else {
		  res.status(404).json({
			  message: "No enty found"
		  });
	  }
	})
	.catch(err => {
	  res.status(500).json({
		error: err
	  });
	});
  }; 

///////////////////
//	GET
// 	GET A USER
const get_one = (req, res, next) => {
	const id = req.params.ubytovanyID;
	Ubytovany.findById(id)
	.populate('rezervacia')
	.exec()
	.then(ubytovany => {
		if(!ubytovany) {
			res.status(404).json({
				message: 'Ubytovany not Found'
			});
		}
		res.status(200).json({
			ubytovany: ubytovany,
			request: {
				type: 'GET',
				url: 'http://localhost:3000/ubytovany'
			}
		})
	})
	.catch(err => {
		res.status(500).json({
			error: err
		})
	});
};

///////////////////
//	DELETE
// 	DELETE A USER
const remove_one = (req, res, next) => {
	const id = req.params.ubytovanyID;
	Ubytovany.remove({ _id: id })
	.exec()
	.then(result => {
		res.status(200).json({
			message: 'Ubytovany deleted',
			request: {
				type: 'GET',
				url: 'http://localhost:3000/ubytovany',
				body: {
					productId: "ID",
					quantity: "Number"
				}
			}
		})
	})
	.catch(err => {
		res.status(500).json({
			error: err
		});
	});
};

///////////////////
//	PATCH
// 	PATCH A USER
const patch_one = (req, res, next) => {
  const id = req.params.ubytovanyID;

  Ubytovany.findOne({ _id: id }).exec()
  .then(( result )=> {
    var myData = req.body;
    Object.assign(result, myData);
	if (req.body.password == null) {
	
		Ubytovany.findOneAndUpdate({ _id: id }, {$set: result}).exec()
		.then(newUbytovany => {
		res.status(200).json({
			newUbytovany,
			message: 'Ubytovany updated',
			request: {
			type: 'GET',
			url: 'http://localhost:3000/ubytovany/' + id
			}
		});
		})
		.catch(err => {
		res.status(500).json({
			error: err
		});
		});
	} else {
		res.status(500).json({
			error: "password cant be change by patch request"
		})
	}

})
.catch((err) => {
	res.status(500).json({
		error: err
	});
});

	
};


module.exports.create = createUser;
module.exports.user_signup = user_signup;
module.exports.user_login = user_login;
module.exports.get_all = user_get_all;
module.exports.get_one = get_one;
module.exports.remove_one = remove_one;
module.exports.patch_one = patch_one;