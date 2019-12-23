const BudovaRepo = require('../models/repositories/BudovaRepo');
const Budova = require('../models/budova');

///////////////////
//	POST
// 	POST BUILDING
const createBudova = function(req, res) {
  const myData = req.body;
  console.log("req-body", req.body);
  console.log('attemping to create a model');
    
  BudovaRepo.create(myData)
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
// 	GET ALL BUILDINGS
const get_all = (req, res) => {
	// Rezervacia.findOneAndUpdate({})
	Budova.find()
		// .select('datum_start cas izba')
		// POPULATING QUERIES
		// MERGING TABLES (MODELS)
		// 1st argument: what item we want to populate
		// 2nd argument: limit this item to displaying only some items
		// .populate('ubytovany')
		.exec()
		.then(budovy => {
			res.status(200).json({
				count: budovy.length,
				budovy: budovy.map(budova => {
					return {
						_id : budova._id,
						product: budova.product,
						quantity: budova.quantity,
						request: {
							type: 'GET',
							url: 'http://localhost:3000/budovy/' + budova._id
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
// 	GET A BUILDING
const get_one = (req, res, next) => {
	const id = req.params.budovaID;
	Budova.findById(id)
	// .populate('product')
	.exec()
	.then(budova => {
		if(!budova) {
			res.status(404).json({
				message: 'Budova not Found'
			});
		}
		res.status(200).json({
			budova: budova,
			request: {
				type: 'GET',
				url: 'http://localhost:3000/budovy'
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
// 	DELETE A BUILDING
const remove_one = (req, res, next) => {
	const id = req.params.budovaID;
	Budova.remove({ _id: id })
	.exec()
	.then(result => {
		res.status(200).json({
			message: 'Budova deleted',
			request: {
				type: 'GET',
				url: 'http://localhost:3000/budovy',
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
// 	PATCH A BUILDING
const patch_one = (req, res, next) => {
	const id = req.params.budovaID;

	Budova.findOne({ _id: id }).exec()
		.then(( result )=> {
		var myData = req.body;
		console.log('loggin req.body', myData);
		console.log('loggin base Budova', result);
		console.log('about to merge object result with req.body')
		Object.assign(result, myData);
		console.log('loggin req.body', myData);
		console.log('loggin base Budova', result);
		// console.log('merged?', result);
	
		Budova.findOneAndUpdate({ _id: id }, {$set: result}).exec()
		.then(newBudova => {
			res.status(200).json({
			newBudova,
			message: 'Budova updated',
			request: {
				type: 'GET',
				url: 'http://localhost:3000/izby/' + id
			}
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
			error: err
			});
		});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
};


module.exports.create = createBudova;
module.exports.get_all = get_all;
module.exports.get_one = get_one;
module.exports.remove_one = remove_one;
module.exports.patch_one = patch_one;