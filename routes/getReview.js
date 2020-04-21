var express = require('express');
var router = express.Router();
var db = require('./dbms');
/* POST get data from reviews */
router.post('/', function (req, res, next) {
    db.dbquery(`SELECT * FROM REVIEWS WHERE CATEGORY='${req.query.type}' AND ITEM = '${req.query.title}'`, function (err, result) { // looks at IDs
            if (err) { // error handling
                console.log(err);
                return;
            }
            console.log(result);
            res.json(result);
        });

});
module.exports = router;