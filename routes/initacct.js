var express = require('express');
var router = express.Router();
var db = require('./dbms');
/* POST updates account info. */
router.post('/', function (req, res, next) {
    username = req.query.username;
    db.dbquery("SELECT * FROM USERS WHERE USERNAME = '" + username + "'", function (err, result) { // looks at users
        if (err) { // error handling
            console.log(err);
            return;
        }
        res.json(result);
    });
});
module.exports = router;