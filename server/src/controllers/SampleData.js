const Rezervacia = require('../models/rezervacia');
const Ubytovany = require('../models/ubytovany');
const {parse, stringify} = require('flatted/cjs');

const load_sample_data = function(req, res) {
    const testUser = Ubytovany.findOne({email: 'alb0024@vsb.cz'});
    // console.log(testUser);
    Rezervacia.create({
        datum_start: '20191216',
        cas_start: '18:00',
        cas: 120,
        stav: 'vytvorena',
        ubytovany: testUser.id,
        izba: 1,
        objednavka: true
    })
    .then((data) => {
        res.json(data);
    })
    .catch((errors) => {
        res.status(500).json(
            stringify(errors)
        );
    });
    // const ubytovany1 = new Ubytovany({
    //     email: 'test1@vsb.cz',
    //     meno: 'Lorem',
    //     priezvisko: 'Ipsum',
    //     login: 'test1xx',
    //     password: 'mypassword',
    //     spolahlivost: 100,
    //     inkaso: true,
    //     preferencie: "pradelny",
    //     rezervacie: rez1,
    //     dokoncene_rezervacie: rez1,
    // });
    // var arr = [];
    // for (let i = 0; i<10; i++) {
    //     arr[i] = rez1;
    //     // await arr[i]
    // }
    // Rezervacia.insertMany(arr, function(err, docs) {
    //     console.log(err, docs);
    // })
    
    // ubytovany1.save();
}

module.exports = load_sample_data;