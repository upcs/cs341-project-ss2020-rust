var fs = require('fs');
var $ = require('jquery');
window.$ = $;
var f = require('../public/javascripts/account');

test('test tab bar default', () => {
    var html = fs.readFileSync('public/accountpage.html', 'utf8');
    document.body.innerHTML = html;
    const $ = require('jquery');
    expect($('#default').html()).toBe("Profile");
}); 

test('test default profile edit button', () => {
    var html = fs.readFileSync('public/accountpage.html', 'utf8');
    document.body.innerHTML = html;
    const $ = require('jquery');
    expect($('#edit-btn').html()).toBe(' Edit Profile ');
}); 

test('test old password auto empty', () => {
    var html = fs.readFileSync('public/accountpage.html', 'utf8');
    document.body.innerHTML = html;
    const $ = require('jquery');
    expect($('#old-pw').html()).toBe('');
}); 

test('test list splitter return', () => {
    var str = "Hello my name is John.";
    var splitter = " "; 
    expect((f.splitList(str, splitter)).length).toBe(5); 
}); 

test('getting saved username', () => {
    var username = f.getUsername(); 
    expect(username).toBe(null);
}); 

test('check that each entry leads to specific category', () => {
    var art = f.selectCategory('0'); 
    expect(art).toBe('Artwork');
    var out = f.selectCategory('1');
    expect(out).toBe('Outdoor Activities');
    var serv = f.selectCategory('2');
    expect(serv).toBe('Community Service');
    var ev = f.selectCategory('3');
    expect(ev).toBe('Events');
}); 

test('visit account page', () => {
    const jsdomAlert = window.alert;  // remember the jsdom alert
    window.alert = () => { };  // provide an empty implementation for window.alert
    var html = fs.readFileSync('public/accountpage.html', 'utf8');
    document.body.innerHTML = html;
    expect(html).toEqual(expect.anything());
    window.alert = jsdomAlert;  // restore the jsdom alert
 });

 test('visit account page', () => {
    const jsdomAlert = window.alert;  // remember the jsdom alert
    window.alert = () => { };  // provide an empty implementation for window.alert
    var html = fs.readFileSync('public/accountpage.html', 'utf8');
    document.body.innerHTML = html;
    expect(f.initUser()).toBeFalsy(); 
    window.alert = jsdomAlert;  // restore the jsdom alert
 });

 test('changing new pw = old pw', () => {
    const jsdomAlert = window.alert;  // remember the jsdom alert
    window.alert = () => { };  // provide an empty implementation for window.alert
    var html = fs.readFileSync('public/accountpage.html', 'utf8');
    document.body.innerHTML = html;
    document.getElementById('old-pw').value = '1234';
    document.getElementById('new-pw').value = '1234';
    expect(f.changePassword()).toBeFalsy(); 
    window.alert = jsdomAlert;  // restore the jsdom alert
 });