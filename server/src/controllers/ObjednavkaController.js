const ObjednavkaRepo = require('../models/repositories/ObjednavkaRepo');
const Objednavka = require('../models/objednavka');

///////////////////
//	POST
// 	POST AN ORDER
const createObjednavka = function(req, res) {
  const myData = req.body;
  console.log("req-body", req.body);
  console.log('attemping to create a model');
    
  ObjednavkaRepo.create(myData)
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
// 	GET ALL ORDERS
const get_all = (req, res) => {
	// Rezervacia.findOneAndUpdate({})
	Objednavka.find()
		// .select('datum_start cas objednavka')
		// POPULATING QUERIES
		// MERGING TABLES (MODELS)
		// 1st argument: what item we want to populate
		// 2nd argument: limit this item to displaying only some items
		// .populate('ubytovany')
		.exec()
		.then(objednavky => {
			res.status(200).json({
				count: objednavky.length,
				objednavky: objednavky.map(objednavka => {
					return {
						_id : objednavka._id,
						product: objednavka.product,
						quantity: objednavka.quantity,
						request: {
							type: 'GET',
							url: 'http://localhost:3000/objednavky/' + objednavka._id
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
// 	GET AN ORDER
const get_one = (req, res, next) => {
	const id = req.params.objednavkaID;
	Objednavka.findById(id)
	.populate('budova')
	.exec()
	.then(objednavka => {
		if(!objednavka) {
			res.status(404).json({
				message: 'Objednavka not Found'
			});
		}
		res.status(200).json({
			objednavka: objednavka,
			request: {
				type: 'GET',
				url: 'http://localhost:3000/objednavky'
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
// 	DELETE AN ORDER
const remove_one = (req, res, next) => {
	const id = req.params.objednavkaID;
	Objednavka.remove({ _id: id })
	.exec()
	.then(result => {
		res.status(200).json({
			message: 'Objednavka deleted',
			request: {
				type: 'GET',
				url: 'http://localhost:3000/objednavky',
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
// 	PATCH AN ORDER
const patch_one = (req, res, next) => {
  const id = req.params.objednavkaID;

  Objednavka.findOne({ _id: id }).exec()
  .then(( result )=> {
    var myData = req.body;
    console.log('loggin req.body', myData);
    console.log('loggin base Objednavka', result);
    console.log('about to merge object result with req.body')
    Object.assign(result, myData);
    console.log('loggin req.body', myData);
    console.log('loggin base Objednavka', result);
    // console.log('merged?', result);

    Objednavka.findOneAndUpdate({ _id: id }, {$set: result}).exec()
    .then(newObjednavka => {
      res.status(200).json({
        newObjednavka,
        message: 'Objednavka updated',
        request: {
          type: 'GET',
          url: 'http://localhost:3000/objednavky/' + id
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

module.exports.create = createObjednavka;
module.exports.get_all = get_all;
module.exports.get_one = get_one;
module.exports.remove_one = remove_one;
module.exports.patch_one = patch_one;