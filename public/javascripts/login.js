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
            //redirect to homepage going to index.html will just redirect to indexUser.html so I just set it so it doesn't require an extra step
            /*
            var div_btn = document.getElementById('loginbtns');
            div_btn.innerHTML = "<button style='width:100px' id='acct'>Account</button>" // not sure what happens to other two buttons
            var btn = document.getElementById('acct');
            var queryString = "?username=" + username;
            window.location.href = "accountpage.html" + queryString; // automatically go to account page
            // TODO: need to create a log out button as well
            */
        }
    });
}