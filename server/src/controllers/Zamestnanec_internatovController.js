const ZamestnanecRepo = require('../models/repositories/Zamestnanec_internatovRepo');
const Zamestnanec = require('../models/zamestnanec_internatov');
const mongoose = require('mongoose');

///////////////////
//	POST
// 	POST A ZAMESTNANEC
const createZamestnanec = function(req, res) {
  const myData = req.body;
  console.log("req-body", req.body);
  console.log('attemping to create a model');
    
  ZamestnanecRepo.create(myData)
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
// 	GET ALL EMPLOYES
const get_all = (req, res) => {
	// Rezervacia.findOneAndUpdate({})
	Zamestnanec.find()
		// .select('datum_start cas zamestnanec')
		// POPULATING QUERIES
		// MERGING TABLES (MODELS)
		// 1st argument: what item we want to populate
		// 2nd argument: limit this item to displaying only some items
		.populate('budova')
		.exec()
		.then(zamestnanci => {
			res.status(200).json({
				count: zamestnanci.length,
				zamestnanci: zamestnanci.map(zamestnanec => {
					return {
						_id : zamestnanec._id,
						login: zamestnanec.login,
						meno: zamestnanec.meno,
						priezvisko: zamestnanec.priezvisko,
						budova: zamestnanec.budova,
						request: {
							type: 'GET',
							url: 'http://localhost:3000/zamestnanci/' + zamestnanec._id
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
// 	GET A EMPLOYE
const get_one = (req, res, next) => {
	const id = req.params.zamestnanecID;
	Zamestnanec.findById(id)
	.populate('budova')
	.exec()
	.then(zamestnanec => {
		if(!zamestnanec) {
			res.status(404).json({
				message: 'Zamestnanec not Found'
			});
		}
		res.status(200).json({
			zamestnanec: zamestnanec,
			request: {
				type: 'GET',
				url: 'http://localhost:3000/zamestnanci'
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
// 	DELETE A EMPLOYE
const remove_one = (req, res, next) => {
	const id = req.params.zamestnanecID;
	Zamestnanec.remove({ _id: id })
	.exec()
	.then(result => {
		res.status(200).json({
			message: 'Zamestnanec deleted',
			request: {
				type: 'GET',
				url: 'http://localhost:3000/zamestnanci',
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
// 	PATCH A EMPLOYE
const patch_one = (req, res, next) => {
  const id = req.params.zamestnanecID;

  Zamestnanec.findOne({ _id: id }).exec()
  .then(( result )=> {
    var myData = req.body;
    console.log('loggin req.body', myData);
    console.log('loggin base Zamestnanec', result);
    console.log('about to merge object result with req.body')
    Object.assign(result, myData);
    console.log('loggin req.body', myData);
    console.log('loggin base Zamestnanec', result);
    // console.log('merged?', result);

    Zamestnanec.findOneAndUpdate({ _id: id }, {$set: result}).exec()
    .then(newZamestnanec => {
      res.status(200).json({
        newZamestnanec,
        message: 'Zamestnanec updated',
        request: {
          type: 'GET',
          url: 'http://localhost:3000/zamestnanci/' + id
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

module.exports.create = createZamestnanec;
module.exports.get_all = get_all;
module.exports.get_one = get_one;
module.exports.remove_one = remove_one;
module.exports.patch_one = patch_one;