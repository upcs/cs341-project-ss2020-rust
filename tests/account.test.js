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