var express = require('express');
var router = express.Router();
var db = require('./dbms');
var userInfo = [];
/* POST updates account info. */
router.post('/', function (req, res, next) {
    var name = req.query.name; // user name
    var rating = req.query.rating; // selected rating
    var category = req.query.cat; // selected category
    var item = req.query.item; // selected item/title
    var comment = req.query.comm; // user comment
    var isUser = req.query.isUser; // Yes or No (If user)
    db.dbquery(`INSERT INTO REVIEWS (NAME, CATEGORY, ITEM, AVGREVIEW, COMMENT, USER) VALUES (${name},
            ${category},${item},${rating},${comment}, ${isUser})`, function (err, result) { 
            if (err) { // error handling
                console.log(err);
                return;
            }
        });

});
module.exports = router;