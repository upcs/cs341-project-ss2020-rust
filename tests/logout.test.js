var fs = require('fs');
var $ = require('jquery');
var f = require('../public/javascripts/logout');
window.$ = $;
test('logout function', () => {
   expect(f.logout()).toEqual(true);
 });