var express = require('express');
var router = express.Router();
var db = require('./dbms');
router.post('/', function (req, res, next) {
    var user = req.query.user;
    var title = req.query.title;
    var type = req.query.type;
    var cat = req.query.cat;
    var num = "-1";
    if(cat == "art"){
        num = "0"; 
    }
    else if(cat == "outdoor"){
        num = "1";
    }
    else if(cat == "service"){
        num = "2";
    }
    else if(cat == "events"){
        num = "3"; 
    }
    db.dbquery("SELECT * FROM USERS WHERE USERNAME = '" + user + "'", function (err, result) {
        if (type == "add") {
            if (result[0].FAVORITES != null) {
                var favoriteList = (result[0].FAVORITES).split(",");
                favoriteList.push(num + title);
                var newlist = '';
                for (var i = 0; i < favoriteList.length; i++) {
                    if (i != favoriteList.length - 1) {
                        newlist += favoriteList[i] + ",";
                    }
                    else {
                        newlist += favoriteList[i];
                    }
                }
                db.dbquery("UPDATE USERS SET FAVORITES='" + newlist + "' WHERE USERNAME='" + user + "'", function (err, result) {
                    if(err){
                        console.log("Unable to add favorite: " + title);
                    }
                    else{
                        console.log("Successfully added new favorite: " + title);
                    }
                });
            }
            else {
                var newlist = title;
                db.dbquery("UPDATE USERS SET FAVORITES='" + newlist + "' WHERE USERNAME='" + user + "'", function (err, result) {
                    console.log("Successfully added new favorite: " + title);
                });
            }
        }
        else if (type == "remove") { // need to do removal !!
            var favoriteList = (result[0].FAVORITES).split(",");
            var removeList = '';
            for(var i = 0; i < favoriteList.length; i++){
                if(favoriteList[i] != title){
                    if(removeList == ''){
                        removeList += favoriteList[i];
                    }
                    else{
                        removeList += "," + favoriteList[i]; 
                    }
                }
            }
            db.dbquery("UPDATE USERS SET FAVORITES='" + removeList + "' WHERE USERNAME='" + user + "'", function (err, result) {
                console.log("Successfully removed new favorite: " + title);
            });
        }
    });
});
module.exports = router;