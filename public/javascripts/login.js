/**
 * login.js
 * @author Geryl Vinoya, Kama Simon, Pele Kamala, Mikey Antkiewicz
 * @version 02April2020
 */

 /**
  * @desc attempt to login  
  */
function login() {
    var username = document.getElementById('loginUsername').value;
    var password = document.getElementById('loginPassword').value;
    $.post("/login?username=" + username + '&password=' + password, function (data) {
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

// end of login.js