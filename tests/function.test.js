var fs = require('fs');
var $ = require('jquery');
window.$ = $;
var f = require('../public/javascripts/category_template');
const descr = "Hello, this is the description";
test('redirects page from user html to non-user html', () => {
    const path = '/artpageUser.html';
    const user = null;
    const cat = 'art';
    const new_path = f.redirect(user,path, cat);
    expect(new_path).not.toBe(path);
}); 


test('redirects page from non-user to user html', () => {
    const path = '/artpage.html';
    const user = 'test-user';
    const cat = 'art';
    const new_path = f.redirect(user,path, cat);
    expect(new_path).not.toBe(path);
}); 

test('does not redirect', () => {
    const path = '/artpage.html';
    const user = null;
    const cat = 'art';
    const new_path = f.redirect(user,path, cat);
    expect(new_path).toBe(path);
}); 

test('checks output of getServiceContent', () => {
    const phone = "(808)222-2222";
    const website = "website.com";
    const output = `<p>${descr}</p><p>${phone} ${website}</p>`;
    const res = f.getServiceContent(descr, phone, website);
    expect(res).toBe(output);
}); 

test('checks output of getEventContent', () => {
    const addr = "808 Street St.";
    const output = `<p>${addr}</p><p>${descr}</p>`;
    const res = f.getEventContent(addr,descr,'','','','');
    expect(res).toBe(output);
}); 

test('checks output of getOutdoorContent', () => {
    let output = ''; 
    const island = "O'ahu";
    const len = "2.5";
    const el = "1000";
    const st = "start pt";
    const end = "end pt";
    const diff = "Difficult";
    const amen = "none";
    let res = f.getOutdoorContent('','','','','','','');
    expect(res).toBe(output);
    res = f.getOutdoorContent('','','','',end,'','');
    expect(res).toBe(output);
    output = `<p>Island: ${island}</p><p>Distance: ${len} mi</p><p>Elevation: ${el} ft</p>`;
    res = f.getOutdoorContent(island, len, el, '', '', '', ''); 
    expect(res).toBe(output);
    output = `<p>Starting Point: ${st}</p><p>Difficulty Level: ${diff}</p><p>Amenities: ${amen}</p>`;
    res = f.getOutdoorContent('','','',st,end,diff,amen);
    expect(res).not.toBe(output);
});

test('checks output of getArtContent', () => {
    const acc = "Limited";
    const creator = "Team Rust";
    const cred = "John Doe";
    const date = "April 1 2020";
    const output = `<p>${descr}</p><p>${creator}, ${cred}, ${date}</p><p> Access: ${acc}</p>`;
    const res = f.getArtContent(descr,acc,creator,cred,date);
    expect(res).toBe(output);
}); 

var ff = jest.mock('../javascripts/category_template');

test('returns average review', async(done) => {
    var html = fs.readFileSync('./public/index.html', 'utf8');
    document.body.innerHTML = html;

    expect(f.getAVGReview('Giraffe', 'Artwork')).toBe(5); 
}); 
