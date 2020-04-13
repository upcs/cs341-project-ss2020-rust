/**
 * register.js
 * @author Geryl Vinoya, Kama Simon, Pele Kamala, Mikey Antkiewicz
 * @version 12April2020
 */

 /**
  * @desc attempt to register new user 
  */
function register() {
    var username = document.getElementById('signupUsername').value;
    var firstName = document.getElementById('signupFirstName').value;
    var lastName = document.getElementById('signupLastName').value;
    var email = document.getElementById('signupEmail').value;
    var password = document.getElementById('signupPassword').value;
    var validLogin = true;
    if (!validUsername(username)) {
        validLogin = false;
    }
    if (!validFirstName(firstName)) {
        validLogin = false;
    }
    if (!validLastName(lastName)) {
        validLogin = false;
    }
    if (!validEmail(email)) {
        validLogin = false;
    }
    if (!validPassword(username, password)) {
        validLogin = false;
    }
    if (validLogin) {
        $.post("/register?username=" + username + '&password=' + password + '&firstName=' + firstName + '&lastName=' + lastName + '&email=' + email, function (data) {
            if (data == "success") {
                document.getElementById('id02').style.display = 'none';
                localStorage.setItem('username', username);
                window.location.href = "indexUser.html";
            } else if (data == "usernameFound=trueemailFound=false") {
                alert("username already exists");
            } else if (data == "usernameFound=falseemailFound=true") {
                alert("email already exists");
            } else {
                alert("username and email already exist");
            }

        }); //creates user in database logs them in and brings them to homepage
    } else {

    } //do nothing
}

/** BELOW ARE VALIDATION FUNCTIONS TO MAKE SURE THAT USER INPUT IS VALID */
function validUsername(a) {
    var num = /^[0-9A-Za-z\.\_\-]+$/; // can be combo of letters, numbers,_,-,.
    if (a.length < 6) {
        alert("Minimum username length of 6");
        return false;
    }
    else if (a.length > 15) {
        alert("Maximum username length of 15");
        return false;
    }
    else if(num.test(a)){
        return true; 
    }
    return false;
}
function validFirstName(a) {
    var num = /^[A-Z][a-z]*$/;
    if (a == '') { // empty 
        return false;
    }
    else if (num.test(a)) { // contains digit
        return true;
    }
    return false;
}
function validLastName(a) {
    var num = /^[A-Z][a-z]*$/;
    if (a == '') {
        return false;
    }
    else if (num.test(a)) {
        return true;
    }
    return false;
}
function validEmail(a) {
    var email = /[A-Za-z0-9]+@[A-Za-z]+.(edu|com)/
    if (email.test(a)) {
        return true;
    }
    return false;
}
function validPassword(user, pw) {
    if (user == pw) {
        alert("Password cannot match username")
        return false; 
    }
    if (pw.length < 8) {
        alert("Minimum password length of 8");
        return false;
    }
    else if (pw.length > 33) {
        alert("Maximum password length of 33");
        return false;
    }
    var oneUpper = /.*[A-Z].*/
    var oneDigit = /.*[0-9].*/
    var oneSpecial = /.*[-\_\.\$\#\@\!].*/
    if(oneUpper.test(pw) && oneDigit.test(pw) && oneSpecial.test(pw)){
        return true; 
    }
    else{
        alert("Invalid password. A password must contain at least ONE:\nUppercase\nDigit\nSpecial Character (- _ . $ # @ !)")
        return false; 
    }
}
// end of register.js

module.exports = {register, validUsername, validFirstName, validEmail, validLastName, validPassword}; 