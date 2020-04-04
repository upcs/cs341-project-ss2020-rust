//Pelenalako Kamala
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
//connecting to database to insert data
var dbms = require('./dbms.js');

//this post request checks if username and password has been registered
router.post('/', function (req, res) {
    //looks for matching username and password
    dbms.dbquery("SELECT * FROM USERS WHERE USERNAME='" + req.query.username + "'",
        function (error, result) {
            if (error) {
                console.log("ERROR: " + error);
                return;
            }
            const found = bcrypt.compareSync(req.query.password, result[0].PASSWORD);
            if (found) {
                res.json(result);
            } else {
                res.json(null);
            }
        });
});

module.exports = router;