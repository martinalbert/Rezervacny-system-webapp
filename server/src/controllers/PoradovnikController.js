const PoradovnikRepo = require('../models/repositories/PoradovnikRepo');
const Poradovnik = require('../models/poradovnik');

///////////////////
//	POST
// 	POST PORADOVNIK
const createPoradovnik = function(req, res) {
  const myData = req.body;
  console.log("req-body", req.body);
  console.log('attemping to create a model');
    
  PoradovnikRepo.create(myData)
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
// 	GET ALL PORADOVNIKS
const get_all = (req, res) => {
	// Rezervacia.findOneAndUpdate({})
	Poradovnik.find()
		// .select('datum_start cas poradovnik')
		// POPULATING QUERIES
		// MERGING TABLES (MODELS)
		// 1st argument: what item we want to populate
		// 2nd argument: limit this item to displaying only some items
		// .populate('ubytovany')
		.exec()
		.then(poradovniky => {
			res.status(200).json({
				count: poradovniky.length,
				poradovniky: poradovniky.map(poradovnik => {
					return {
						_id : poradovnik._id,
						product: poradovnik.product,
						quantity: poradovnik.quantity,
						request: {
							type: 'GET',
							url: 'http://localhost:3000/poradovniky/' + poradovnik._id
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
// 	GET A PORADOVNIK
const get_one = (req, res, next) => {
	const id = req.params.poradovnikID;
	Poradovnik.findById(id)
	.populate('budova')
	.exec()
	.then(poradovnik => {
		if(!poradovnik) {
			res.status(404).json({
				message: 'Poradovnik not Found'
			});
		}
		res.status(200).json({
			poradovnik: poradovnik,
			request: {
				type: 'GET',
				url: 'http://localhost:3000/poradovniky'
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
// 	DELETE A PORADOVNIK
const remove_one = (req, res, next) => {
	const id = req.params.poradovnikID;
	Poradovnik.remove({ _id: id })
	.exec()
	.then(result => {
		res.status(200).json({
			message: 'Poradovnik deleted',
			request: {
				type: 'GET',
				url: 'http://localhost:3000/poradovniky',
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
// 	PATCH A PORADOVNIK
const patch_one = (req, res, next) => {
  const id = req.params.poradovnikID;

  Poradovnik.findOne({ _id: id }).exec()
  .then(( result )=> {
    var myData = req.body;
    console.log('loggin req.body', myData);
    console.log('loggin base Poradovnik', result);
    console.log('about to merge object result with req.body')
    Object.assign(result, myData);
    console.log('loggin req.body', myData);
    console.log('loggin base Poradovnik', result);
    // console.log('merged?', result);

    Poradovnik.findOneAndUpdate({ _id: id }, {$set: result}).exec()
    .then(newPoradovnik => {
      res.status(200).json({
        newPoradovnik,
        message: 'Poradovnik updated',
        request: {
          type: 'GET',
          url: 'http://localhost:3000/poradovniky/' + id
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

module.exports.create = createPoradovnik;
module.exports.get_all = get_all;
module.exports.get_one = get_one;
module.exports.remove_one = remove_one;
module.exports.patch_one = patch_one;