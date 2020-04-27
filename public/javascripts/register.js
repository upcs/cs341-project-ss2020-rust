/**
 * register.js
 * @author Geryl Vinoya, Kama Simon, Pele Kamala, Mikey Antkiewicz
 * @version 25April2020
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
    var validSignup = checkValidSignup(username, firstName, lastName, email, password);
    if (validSignup) {
        $.post(`/register?username=${username}&password=${password}&firstName=${firstName}&lastName=${lastName}&email=${email}`, function (data) {
            if (data == "success") {
                document.getElementById('usernameExists').style.display = 'none';
                document.getElementById('emailExists').style.display = 'none';
                document.getElementById('id02').style.display = 'none';
                localStorage.setItem('username', username);
                window.location.href = "indexUser.html";
            } else if (data == "usernameFound=trueemailFound=false") {
                document.getElementById('usernameExists').style.display = 'block';
                document.getElementById('emailExists').style.display = 'none';
            } else if (data == "usernameFound=falseemailFound=true") {
                document.getElementById('usernameExists').style.display = 'none';
                document.getElementById('emailExists').style.display = 'block';
            } else {
                document.getElementById('usernameExists').style.display = 'block';
                document.getElementById('emailExists').style.display = 'block';
            }

        }); //creates user in database logs them in and brings them to homepage
    } else {
        return false;
    } //do nothing
}

function checkValidSignup(username, firstName, lastName, email, password){
    var confirmPassword = document.getElementById('signupConfirmPassword').value;
    var validSignup = true; 
    if (!validUsername(username)) {
        document.getElementById('usernameError').style.display = 'block';
        validSignup = false;
    } else{
        document.getElementById('usernameError').style.display = 'none';
    }
    if (!validFirstName(firstName)) {
        document.getElementById('firstNameError').style.display = 'block';
        validSignup = false;
    } else{
        document.getElementById('firstNameError').style.display = 'none';
    }
    if (!validLastName(lastName)) {
        document.getElementById('lastNameError').style.display = 'block';
        validSignup = false;
    } else{
        document.getElementById('lastNameError').style.display = 'none';
    }
    if (!validEmail(email)) {
        document.getElementById('emailError').style.display = 'block';
        validSignup = false;
    } else{
        document.getElementById('emailError').style.display = 'none';
    }
    if (!validPassword(username, password)) {
        document.getElementById('passwordError').style.display = 'block';
        validSignup = false;
    } else{
        document.getElementById('passwordError').style.display = 'none';
    }
    if (password != confirmPassword){
        document.getElementById('confirmPasswordError').style.display = 'block';
        validSignup = false;
    } else{
        document.getElementById('confirmPasswordError').style.display = 'none';
    }
    return validSignup; 
}

/** BELOW ARE VALIDATION FUNCTIONS TO MAKE SURE THAT USER INPUT IS VALID */
function validUsername(a) {
    var num = /^[0-9A-Za-z\.\_\-]+$/; // can be combo of letters, numbers,_,-,.
    if (a.length < 6) {
        return false;
    }
    else if (a.length > 15) {
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
        return false; 
    }
    if (pw.length < 8) {
        return false;
    }
    else if (pw.length > 33) {
        return false;
    }
    var oneUpper = /.*[A-Z].*/
    var oneDigit = /.*[0-9].*/
    var oneSpecial = /.*[-\_\.\$\#\@\!].*/
    if(oneUpper.test(pw) && oneDigit.test(pw) && oneSpecial.test(pw)){
        return true; 
    }
    else{
        return false; 
    }
}
// end of register.js

module.exports = {register, validUsername, validFirstName, validEmail, validLastName, validPassword}; 