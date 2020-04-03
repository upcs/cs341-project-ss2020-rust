var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var db = require('./dbms');
/* POST updates account info. */
router.post('/', function (req, res, next) {
    var username = req.query.username;
    var oldpw = req.query.old;
    var newpw = req.query.new;
    console.log(oldpw);
    db.dbquery("SELECT * FROM USERS WHERE USERNAME = '" + username + "'", function (err, result) { // looks at users
        if (err) { // error handling
            console.log(err);
            return;
        }
        const found = bcrypt.compareSync(oldpw, result[0].PASSWORD);
        if (found) {
            const hashedPassword = bcrypt.hashSync(newpw, 10);
            db.dbquery("UPDATE USERS SET PASSWORD = '" + hashedPassword + "' WHERE USERNAME = '" + username + "'", function (err, result) {
                if (err) { // error handling
                    console.log(err);
                    return;
                }
            });
            res.json(result);
        } else {
            res.json(null);
        }
    });
});
module.exports = router;