const IzbaRepo = require('../models/repositories/IzbaRepo');
const Budova = require('../models/budova');
const Izba = require('../models/izba');
const mongoose = require('mongoose');

///////////////////
//	POST
// 	POST A ROOM
const createIzba = function(req, res) {
  const myData = req.body;
  IzbaRepo.create(myData)
    .then((data) => {
      res.json(data);
    }).catch((errors) => {
      res.status(500).json({
        errors,
      });
    });
  
}


///////////////////
//	GET
// 	GET ALL ROOMS
const get_all = (req, res) => {
	// Rezervacia.findOneAndUpdate({})
	Izba.find()
		// .select('datum_start cas izba')
		// POPULATING QUERIES
		// MERGING TABLES (MODELS)
		// 1st argument: what item we want to populate
		// 2nd argument: limit this item to displaying only some items
		// .populate('ubytovany')
		.exec()
		.then(izby => {
			res.status(200).json({
				count: izby.length,
				izby: izby.map(izba => {
					return {
						izba: izba,
						request: {
							type: 'GET',
							url: 'http://localhost:3000/izby/' + izba._id
						}
					}})
				});
		})
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});
};

///////////////////
//	GET
// 	GET A ROOM
const get_one = (req, res, next) => {
	const id = req.params.izbaID;
	Izba.findById(id)
	.populate('budova')
	.exec()
	.then(izba => {
		if(!izba) {
			res.status(404).json({
				message: 'Izba not Found'
			});
		}
		res.status(200).json({
			izba: izba,
			request: {
				type: 'GET',
				url: 'http://localhost:3000/izby'
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
// 	DELETE A ROOM
const remove_one = (req, res, next) => {
	const id = req.params.izbaID;
	Izba.remove({ _id: id })
	.exec()
	.then(result => {
		res.status(200).json({
			message: 'Izba deleted',
			request: {
				type: 'GET',
				url: 'http://localhost:3000/izby',
				body: {
					productId: "ID",
					quantity: "Number"
				}
			}
		})
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
};

///////////////////
//	PATCH
// 	PATCH A ROOM
const patch_one = (req, res, next) => {
  const id = req.params.izbaID;

  Izba.findOne({ _id: id }).exec()
  .then(( result )=> {
    var myData = req.body;
    Object.assign(result, myData);

    Izba.findOneAndUpdate({ _id: id }, {$set: result}).exec()
    .then(newIzba => {
      res.status(200).json({
        izba: newIzba,
        message: 'Izba updated',
        request: {
          type: 'GET',
          url: 'http://localhost:3000/izby/' + id
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  })
  .catch((err) => {
		res.status(500).json({
			error: err
		});
	});

	
};

module.exports.create = createIzba;
module.exports.get_all = get_all;
module.exports.get_one = get_one;
module.exports.remove_one = remove_one;
module.exports.patch_one = patch_one;