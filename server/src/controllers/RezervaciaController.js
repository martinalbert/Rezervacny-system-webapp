const RezervaciaRepo = require('../models/repositories/RezervaciaRepo');
const Rezervacia = require('../models/rezervacia');
const mongoose = require('mongoose');

///////////////////
//	POST
// 	POST A RESERVATION
const createRezervacia = function(req, res) {
  const myData = req.body;
    
  RezervaciaRepo.create(myData)
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
// 	GET ALL RESERVATIONS
const get_all = (req, res) => {
	// Rezervacia.findOneAndUpdate({})
	Rezervacia.find()
		// .select('datum_start cas izba')
		// POPULATING QUERIES
		// MERGING TABLES (MODELS)
		// 1st argument: what item we want to populate
		// 2nd argument: limit this item to displaying only some items
		
		.populate('ubytovany izba')
		.exec()
		.then(rezervacie => {
			res.status(200).json({
				count: rezervacie.length,
				rezervacie: rezervacie.map(rezervacia => {
					return {
						rezervacia: rezervacia,
						request: {
							type: 'GET',
							url: 'http://localhost:3000/rezervacie/' + rezervacia._id
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
// 	GET A RESERVATION
const get_one = (req, res, next) => {
	const id = req.params.rezervaciaID;
	Rezervacia.findById(id)
	.populate('ubytovany izba')
	.exec()
	.then(rezervacia => {
		if(!rezervacia) {
			res.status(404).json({
				message: 'Rezervacia not Found'
			});
		}
		res.status(200).json({
			rezervacia: rezervacia,
			request: {
				type: 'GET',
				url: 'http://localhost:3000/rezervacie'
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
// 	DELETE A RESERVATION
const remove_one = (req, res, next) => {
	const id = req.params.rezervaciaID;
	Rezervacia.remove({ _id: id })
	.exec()
	.then(result => {
		res.status(200).json({
			message: 'Rezervacia deleted',
			request: {
				type: 'GET',
				url: 'http://localhost:3000/rezervacie',
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
// 	PATCH A RESERVATION
const patch_one = (req, res, next) => {
	const id = req.params.rezervaciaID;
	
	Rezervacia.findOne({ _id: id }).exec()
	.then(( result )=> {
		var myData = req.body;
		Object.assign(result, myData);

		Rezervacia.findOneAndUpdate({ _id: id }, {$set: result}).exec()
		.then(newRezervacia => {
			res.status(200).json({
				newRezervacia,
				message: 'Rezervacia updated',
				request: {
				type: 'GET',
				url: 'http://localhost:3000/rezervacie/' + id
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

module.exports.create = createRezervacia;
module.exports.get_all = get_all;
module.exports.get_one = get_one;
module.exports.remove_one = remove_one;
module.exports.patch_one = patch_one;