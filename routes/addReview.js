var express = require('express');
var router = express.Router();
var db = require('./dbms');
var userInfo = [];
/* POST updates account info. */
router.post('/', function (req, res, next) {
    var name = req.query.name;
    var rating = req.query.rating;
    var category = req.query.cat;
    var item = req.query.item;

    db.dbquery("INSERT INTO REVIEWS (NAME, CATEGORY, ITEM, AVGREVIEW) VALUES (" + name + ","
        + category + "," + item + "," + rating + ")", function (err, result) { // looks at IDs
            if (err) { // error handling
                console.log(err);
                return;
            }
        });

});
module.exports = router;