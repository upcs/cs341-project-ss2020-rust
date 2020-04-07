var express = require('express');
var router = express.Router();
var db = require('./dbms');
/* POST retrieve art info. */
router.post('/', function (req, res, next) {
    var title = req.query.title;
    var type = req.query.type;
    if (type == 'art') {
        db.dbquery("SELECT * FROM ART WHERE TITLE = '" + title + "'", function (err, result) { // looks at users
            if (err) { // error handling
                console.log(err);
                return;
            }
            res.json(result);
        });
    }
    else if (type == 'outdoor') {
        db.dbquery("SELECT * FROM OUTDOOR WHERE TITLE = '" + title + "'", function (err, result) { // looks at users
            if (err) { // error handling
                console.log(err);
                return;
            }
            console.log(result);
            res.json(result);
        });
    }
    else if (type == 'service') {
        db.dbquery("SELECT * FROM SERVICE WHERE TITLE = '" + title + "'", function (err, result) { // looks at users
            if (err) { // error handling
                console.log(err);
                return;
            }
            console.log(result);
            res.json(result);
        });
    }
    else if (type == 'events') {
        db.dbquery("SELECT * FROM EVENTS WHERE TITLE ='" + title + "'", function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(result);
            res.json(result);
        });
    }
});
module.exports = router;