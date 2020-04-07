var $ = require('jquery');
var f = require('../public/javascripts/login');

test('getting username input', () => {
    document.body.innerHTML = '<div> \
    <input type="text" id="loginUsername"> </div>'; 
    document.getElementById('loginUsername').value = 'doej21';
    expect(f.getUsername()).toBe('doej21');
}); 

test('getting username input', () => {
    document.body.innerHTML = '<div> \
    <input type="text" id="loginPassword"> </div>'; 
    document.getElementById('loginPassword').value = 'password';
    expect(f.getPassword()).toBe('password');
}); 