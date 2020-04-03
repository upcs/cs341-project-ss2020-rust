var express = require('express');
var router = express.Router();
var db = require('./dbms');
var userInfo = [];
/* POST updates account info. */
router.post('/', function (req, res, next) {
    var username = req.query.username;
    var first = req.query.fname;
    var last = req.query.lname;
    var bio = req.query.bio;

    db.dbquery("SELECT * FROM USERS WHERE USERNAME LIKE '" + username + "'", function (err, result) { // looks at IDs
        if (err) { // error handling
            console.log(err);
            return;
        }

        db.dbquery("UPDATE USERS SET FIRSTNAME = '" + first + "', LASTNAME = '" + last + "', BIO = '" +
            bio + "' WHERE USERNAME = '" + username + "'", // updates user info in database
            function (error, update) {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log("Account successfully updated.");
                db.dbquery("SELECT * FROM USERS WHERE USERNAME LIKE '" + username + "'", function (err, result) { // looks at IDs
                    if (err) { // error handling
                        console.log(err);
                        return;
                    }
                    userInfo = result;
                    res.json(userInfo); // returns user info
                });
            });
    });

});
module.exports = router;

/*
    version: 23 FEB 2020
    TODO:
    none
*/