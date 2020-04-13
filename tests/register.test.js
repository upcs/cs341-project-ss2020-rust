var $ = require('jquery');
window.$ = $;
var f = require('../public/javascripts/register');
test('testing username valid', () => {
    var username = 'doej21';
    expect(f.validUsername(username)).toBeTruthy();
});

test('testing username not valid', () => {
    var username = '';
    expect(f.validUsername(username)).toBeFalsy();
});

test('valid email', () => {
    var email = 'doej21@up.edu';
    expect(f.validEmail(email)).toBeTruthy();
});

test('not valid email', () => {
    var email = 'doej21$';
    expect(f.validEmail(email)).toBeFalsy();
    email = '';
    expect(f.validEmail(email)).toBeFalsy();
    email = 'doesj21@com';
    expect(f.validEmail(email)).toBeFalsy();
    email = 'doesj21@fake.net';
    expect(f.validEmail(email)).toBeFalsy();
});

test('valid last name', () => {
    var name = 'Simon';
    expect(f.validLastName(name)).toBeTruthy();
});

test('not valid last name', () => {
    var name = 'simonk21$';
    expect(f.validLastName(name)).toBeFalsy();
    name = 'simon';
    expect(f.validLastName(name)).toBeFalsy();
    name = 'SiMon';
    expect(f.validLastName(name)).toBeFalsy();
    name = '';
    expect(f.validLastName(name)).toBeFalsy();
});

test('valid first name', () => {
    var name = 'John';
    expect(f.validFirstName(name)).toBeTruthy();
});

test('not valid first name', () => {
    var name = 'simonk21$';
    expect(f.validFirstName(name)).toBeFalsy();
    name = 'john';
    expect(f.validFirstName(name)).toBeFalsy();
    name = 'joHn';
    expect(f.validFirstName(name)).toBeFalsy();
    name = '';
    expect(f.validFirstName(name)).toBeFalsy();
});

test('testing password valid', () => {
    var pw = 'P@ssword1';
    expect(f.validPassword(pw)).toBeTruthy();
});

test('testing password invalid', () => {
    var pw = 'password';
    expect(f.validPassword(pw)).toBeFalsy();
});

test('testing register function', () => {
    var html = fs.readFileSync('./public/index.html', 'utf8');
    expect(html.register()).toBeFalsy();
});