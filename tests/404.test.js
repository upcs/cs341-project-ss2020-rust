'use strict';
var fs = require('fs');
var $ = require('../node_modules/jquery');
var f = require('../public/javascripts/404');
window.$ = $;
test('visit 404 page', () => {
	var html = fs.readFileSync('public/404.html', 'utf8');
    expect(html).toEqual(expect.anything());
 });