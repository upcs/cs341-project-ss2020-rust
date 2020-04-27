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

 test('test setForm()', () => {
    var html = fs.readFileSync('public/accountpage.html', 'utf8');
    document.body.innerHTML = html;
    f.setForm();
    expect(document.getElementById('fname').value).toBe('');
}); 

test('test getIndex()', () => {
    var html = fs.readFileSync('public/accountpage.html', 'utf8');
    document.body.innerHTML = html;
    expect(f.getIndex()).toBe('0');
    document.getElementById('avtr').src = 'images/img_avatar.png';
    expect(f.getIndex()).toBe('1');
    document.getElementById('avtr').src = 'images/penguin.png';
    expect(f.getIndex()).toBe('2');
    document.getElementById('avtr').src = 'images/ninja.png';
    expect(f.getIndex()).toBe('3');
}); 

test('test setAvatar()', () => {
    var html = fs.readFileSync('public/accountpage.html', 'utf8');
    document.body.innerHTML = html;
    expect(f.setAvatar()).toBe("images/img_avatar2.png");
}); 

test('test toggle()', () => {
    var html = fs.readFileSync('public/accountpage.html', 'utf8');
    document.body.innerHTML = html;
    f.toggle('on');
    var def = document.getElementById("default-prof");
    expect(def.style.display).toBe('none');
    f.toggle('off');
    expect(def.style.display).toBe('block');
}); 


test('test checkNull()', () => {
    var html = fs.readFileSync('public/accountpage.html', 'utf8');
    document.body.innerHTML = html;
    expect(f.checkNull(null)).toBe(""); 
}); 

test('test defaultAv()', () => {
    var html = fs.readFileSync('public/accountpage.html', 'utf8');
    document.body.innerHTML = html;
    expect(f.defaultAv(null)).toBe("/images/img_avatar2.png"); 
}); 

test('test validPassword()', () => {
    var html = fs.readFileSync('public/accountpage.html', 'utf8');
    document.body.innerHTML = html;
    const jsdomAlert = window.alert;  // remember the jsdom alert
    window.alert = () => { };  // provide an empty implementation for window.alert
    expect(f.validPassword('test', '1234','1234')).toBeFalsy();
    expect(f.validPassword('test', '1234','test')).toBeFalsy();
    expect(f.validPassword('test', '11','1234')).toBeFalsy();
    expect(f.validPassword('test', '11','1234567890123456789012345678901234')).toBeFalsy();
    expect(f.validPassword('test', '11','P@ssword1')).toBeTruthy();
    expect(f.validPassword('test', '11','P@sswordd')).toBeFalsy();
    window.alert = jsdomAlert;  // restore the jsdom alert
}); 

test('test sortTable',()=>{
    var html = fs.readFileSync('public/accountpage.html', 'utf8');
    document.body.innerHTML = html;
    document.getElementById('myTable').innerHTML = '<tr><td>Col 1</td><td>Col 2</td></tr>';
    document.getElementById('myTable').innerHTML += '<tr><td>Next Col 1</td><td>Next Col 2</td></tr>';
    document.getElementById('myTable').innerHTML += '<tr><td>Next Col 1</td><td>Next Col 2</td></tr>';
    document.getElementById('myTable').innerHTML += '<tr><td>A Col 1</td><td>Next Col 2</td></tr>';
    expect(f.sortTable(0,'myTable')).toBeTruthy();
});

test('test sortTable',()=>{
    var html = fs.readFileSync('public/accountpage.html', 'utf8');
    document.body.innerHTML = html;
    document.getElementById('myTable').innerHTML = '<tr><td>Col 1</td><td>Col 2</td></tr>';
    document.getElementById('myTable').innerHTML += '<tr><td>Next Col 1</td><td>Next Col 2</td></tr>';
    document.getElementById('myTable').innerHTML += '<tr><td>Next Col 1</td><td>Next Col 2</td></tr>';
    expect(f.sortTable(0,'myTable')).toBeTruthy();
});
 /*
 test('changing new pw = old pw', () => {
    const jsdomAlert = window.alert;  // remember the jsdom alert
    window.alert = () => { };  // provide an empty implementation for window.alert
    var html = fs.readFileSync('public/accountpage.html', 'utf8');
    document.body.innerHTML = html;
    expect(f.openAccTab("tablinks", "Profile")).toBe(expect.anything()); 
    window.alert = jsdomAlert;  // restore the jsdom alert
 });
 */