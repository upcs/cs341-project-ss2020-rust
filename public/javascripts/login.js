"use strict";
/**
 * login.js
 * @author Geryl Vinoya, Kama Simon, Pele Kamala, Mikey Antkiewicz
 * @version 25April2020
 */
 /**
  * @desc attempt to login  
  */
function login() {
    var username = getUsername();
    var password = getPassword(); 
    $.post(`/login?username=${username}&password=${password}`, function (data) {
        if (data == null) {
            document.getElementById('loginPassword').value = '';
            document.getElementById('invalidLogin').innerHTML = "Invalid Username or Password!";
        } else {
            document.getElementById('id01').style.display = 'none';
            localStorage.setItem('username', username);
            window.location.href = "indexUser.html";
        }
    });
}

function getUsername(){
    var username = document.getElementById('loginUsername').value; 
    return username; 
}

function getPassword(){
    var password = document.getElementById('loginPassword').value;
    return password; 
} 
module.exports = {login, getUsername, getPassword};
// end of login.js