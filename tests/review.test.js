var fs = require('fs');
var $ = require('jquery');
window.$ = $;
var f = require('../public/javascripts/review');

test('validate button rating return of int', () => {
    document.body.innerHTML = "<p id='5'></p><p id='4'></p><p id='3'></p><p id='2'></p><p id='1'></p>";
    let num = f.getRating(); 
    expect(num).toBe(0); 
    document.getElementById('1').style.color = "rgb(255, 199, 0)";
    num = f.getRating();
    expect(num).toBe(1); 
    document.getElementById('2').style.color = "rgb(255, 199, 0)";
    num = f.getRating();
    expect(num).toBe(2);
    expect(num).not.toBe(1);
    document.getElementById('3').style.color = "rgb(255, 199, 0)";
    num = f.getRating();
    expect(num).toBe(3);
    document.getElementById('4').style.color = "rgb(255, 199, 0)";
    num = f.getRating();
    expect(num).toBe(4);
    document.getElementById('5').style.color = "rgb(255, 199, 0)";
    num = f.getRating();
    expect(num).toBe(5);
}); 

test('check valid submission', () => {
    const jsdomAlert = window.alert;  // remember the jsdom alert
    window.alert = () => { };  // provide an empty implementation for window.alert
    document.body.innerHTML = "<p id='categoryOptions'></p><p id='titleOptions'></p>";
    document.getElementById('categoryOptions').innerHTML = 'Artwork';
    document.getElementById('titleOptions').innerHTML = 'test title';
    let bool = f.validSubmission();
    expect(bool).toBeTruthy();
    window.alert = jsdomAlert;  // restore the jsdom alert
}); 

test('check invalid submission', () => {
    const jsdomAlert = window.alert;  // remember the jsdom alert
    window.alert = () => { };  // provide an empty implementation for window.alert
    document.body.innerHTML = "<select id='categoryOptions'></select><select id='titleOptions'></select>";
    document.getElementById('categoryOptions').value = 'Artwork';
    document.getElementById('titleOptions').value = '';
    let bool = f.validSubmission();
    expect(bool).toBeFalsy();
    document.getElementById('categoryOptions').value = '';
    bool = f.validSubmission();
    expect(bool).not.toBeTruthy();
    window.alert = jsdomAlert;  // restore the jsdom alert
}); 