var express = require('express');
var router = express.Router();
var db = require('./dbms');
/* POST get data from reviews */
router.post('/', function (req, res, next) {
    db.dbquery("SELECT * FROM REVIEWS WHERE CATEGORY='" + req.query.cat + "'", function (err, result) { // looks at IDs
            if (err) { // error handling
                console.log(err);
                return;
            }
            res.json(result);
        });

});
module.exports = router;