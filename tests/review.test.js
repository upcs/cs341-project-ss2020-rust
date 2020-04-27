var fs = require('fs');
var $ = require('jquery');
window.$ = $;
var f = require('../public/javascripts/review');
var html = fs.readFileSync('./public/reviewpage.html', 'utf8');
document.body.innerHTML = html;
test('validate button rating return of int', () => {
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
/*
test('check valid submission', () => {
    const jsdomAlert = window.alert;  // remember the jsdom alert
    window.alert = () => { };  // provide an empty implementation for window.alert
    var html = fs.readFileSync('./public/reviewpage.html', 'utf8');
    document.body.innerHTML = html;
    document.getElementById('categoryOptions').value = 'Artwork';
    document.getElementById('2').style.color = "rgb(255, 199, 0)";
    expect(f.getRating()).toBe(2);
    expect(document.getElementById('categoryOptions').value).toBe('Art');
    let bool = f.validSubmission();
    expect(bool).toBeTruthy();
    window.alert = jsdomAlert;  // restore the jsdom alert
}); 
*/
test('check invalid submission', () => {
    const jsdomAlert = window.alert;  // remember the jsdom alert
    window.alert = () => { };  // provide an empty implementation for window.alert
    var ht = fs.readFileSync('./public/reviewpage.html', 'utf8');
    document.body.innerHTML = ht;
    let bool = f.validSubmission();
    expect(bool).toBeFalsy();
    window.alert = jsdomAlert;  // restore the jsdom alert
}); 

test('check function checkCom', () => {
    let str = "'Hello' It's";
    expect(f.checkCom(str)).toBe("\\'Hello\\' It\\'s");
}); 

test('check function checkAmp', () => {
    let str = "Tom & Jerrys";
    expect(f.checkAmp(str)).toBe("Tom \\& Jerrys");
}); 

test('check function convertString', () => {
    let str = "Tom & Jerry's";
    expect(f.convertString(str)).toBe("Tom \\& Jerry\\'s");
}); 

test('check comment count func', () => {
    document.getElementById('comments').value = "H";
    expect(f.commentCount(document.getElementById('comments'))).toBe(299);
}); 


test('check checkAnon', () => {
    expect(f.checkAnon('')).toBe('Anonymous');
    expect(f.checkAnon('Hello')).not.toBe('Anonymous');
}); 
test('test initForm', () => {
    expect(f.initForm()).toBeFalsy();
    localStorage.setItem('username','test-hash'); 
    expect(f.initForm()).toBeTruthy();
}); 

test('test no submission', () => {
    expect(f.submitReview()).toBeFalsy();
}); 
