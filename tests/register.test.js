var $ = require('jquery');
window.$ = $;
var f = require('../public/javascripts/register');
test('testing username valid', () => {
    var username = 'doej21';
    expect(f.validUsername(username)).toBeTruthy();
});

test('username length under 8', () => {
    const jsdomAlert = window.alert;  // remember the jsdom alert
    window.alert = () => {};  // provide an empty implementation for window.alert
    var username = '';
    expect(f.validUsername(username)).toBeFalsy();
    window.alert = jsdomAlert;  // restore the jsdom alert
});
test('username length over 15', () => {
    const jsdomAlert = window.alert;  // remember the jsdom alert
    window.alert = () => {};  // provide an empty implementation for window.alert
    var username = '1234567891123456';
    expect(f.validUsername(username)).toBeFalsy();
    window.alert = jsdomAlert;  // restore the jsdom alert
});
test('username does not meet requirements besides length', () => {
    const jsdomAlert = window.alert;  // remember the jsdom alert
    window.alert = () => {};  // provide an empty implementation for window.alert
    var username = '$$$$$$$$$';
    expect(f.validUsername(username)).toBeFalsy();
    window.alert = jsdomAlert;  // restore the jsdom alert
});

test('valid email', () => {
    var email = 'doej21@up.edu';
    expect(f.validEmail(email)).toBeTruthy();
});

test('not valid email', () => {
    const jsdomAlert = window.alert;  // remember the jsdom alert
    window.alert = () => {};  // provide an empty implementation for window.alert
    var email = 'doej21$';
    expect(f.validEmail(email)).toBeFalsy();
    email = '';
    expect(f.validEmail(email)).toBeFalsy();
    email = 'doesj21@com';
    expect(f.validEmail(email)).toBeFalsy();
    email = 'doesj21@fake.net';
    expect(f.validEmail(email)).toBeFalsy();
    window.alert = jsdomAlert;  // restore the jsdom alert
});

test('valid last name', () => {
    var name = 'Simon';
    expect(f.validLastName(name)).toBeTruthy();
});

test('not valid last name', () => {
    const jsdomAlert = window.alert;  // remember the jsdom alert
    window.alert = () => {};  // provide an empty implementation for window.alert
    var name = 'simonk21$';
    expect(f.validLastName(name)).toBeFalsy();
    name = 'simon';
    expect(f.validLastName(name)).toBeFalsy();
    name = 'SiMon';
    expect(f.validLastName(name)).toBeFalsy();
    name = '';
    expect(f.validLastName(name)).toBeFalsy();
    window.alert = jsdomAlert;  // restore the jsdom alert
});

test('valid first name', () => {
    var name = 'John';
    expect(f.validFirstName(name)).toBeTruthy();
});

test('not valid first name', () => {
    const jsdomAlert = window.alert;  // remember the jsdom alert
    window.alert = () => {};  // provide an empty implementation for window.alert
    var name = 'simonk21$';
    expect(f.validFirstName(name)).toBeFalsy();
    name = 'john';
    expect(f.validFirstName(name)).toBeFalsy();
    name = 'joHn';
    expect(f.validFirstName(name)).toBeFalsy();
    name = '';
    expect(f.validFirstName(name)).toBeFalsy();
    window.alert = jsdomAlert;  // restore the jsdom alert
});

test('testing password valid', () => {
    var pw = 'Da$12345';
    var user = 'doej21';
    expect(f.validPassword(user, pw)).toBeTruthy();
});

test('testing password invalid', () => {
    const jsdomAlert = window.alert;  // remember the jsdom alert
    window.alert = () => {};  // provide an empty implementation for window.alert
    var pw = '12345';
    var user = '12345';
    expect(f.validPassword(user, pw)).toBeFalsy();
    window.alert = jsdomAlert;  // restore the jsdom alert
});

test('testing pw length to be under 8', () => {
    const jsdomAlert = window.alert;  // remember the jsdom alert
    window.alert = () => {};  // provide an empty implementation for window.alert
    var pw = 'Da_1';
    var user = 'doej21';
    expect(f.validPassword(user, pw)).toBeFalsy();
    window.alert = jsdomAlert;  // restore the jsdom alert
});

test('testing pw length to be over 33', () => {
    const jsdomAlert = window.alert;  // remember the jsdom alert
    window.alert = () => {};  // provide an empty implementation for window.alert
    var pw = 'Da_1234567890123456789012345678901234567890123456789012345678901234567890';
    var user = 'doej21';
    expect(f.validPassword(user, pw)).toBeFalsy();
    window.alert = jsdomAlert;  // restore the jsdom alert
});

test('testing pw to not contain specific parts', () => {
    const jsdomAlert = window.alert;  // remember the jsdom alert
    window.alert = () => {};  // provide an empty implementation for window.alert
    var pw = 'Daaaaaaaaaaa808';
    var user = 'doej21';
    expect(f.validPassword(user, pw)).toBeFalsy();
    window.alert = jsdomAlert;  // restore the jsdom alert
});

/*
test('testing getElementById', () => {
    document.body.innerHTML = '<input type="text" class="inputText" placeholder="Enter Username" id="signupUsername"> \
    <input type="text" class="inputText" placeholder="Enter First Name" id="signupFirstName">\
    <input type="text" class="inputText" placeholder="Enter Last Name" id="signupLastName">\
    <input type="text" class="inputText" placeholder="Enter Email" id="signupEmail">\
    <input type="password" class="inputText" placeholder="Enter Password" id="signupPassword">';
    document.getElementById('signupUsername').value = '';
    expect(f.validPassword(user, pw)).toBeFalsy();
});
*/
