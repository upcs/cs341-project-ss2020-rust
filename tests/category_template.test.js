var fs = require('fs');
var $ = require('jquery');
window.$ = $;
var f = require('../public/javascripts/category_template');

function isStyleVisible(element) {
  const {getComputedStyle} = element.ownerDocument.defaultView

  const {display, visibility, opacity} = getComputedStyle(element)
  return (
    display !== 'none' &&
    visibility !== 'hidden' &&
    visibility !== 'collapse' &&
    opacity !== '0' &&
    opacity !== 0
  )
}

function isElementVisible(element) {
  return (
    isStyleVisible(element) &&
    (!element.parentElement || isElementVisible(element.parentElement))
  )
}

test('element is visible when y = x.length', () => {
	var html = fs.readFileSync('public/artpage.html', 'utf8');
	document.body.innerHTML = html;
	document.getElementById('searchbar_input').value = '*1*2*3*3*48*%YG*4*0000';
	let t = f.search_table();
	var r = document.getElementById('result');
	expect(isElementVisible(r)).toBe(true);
});

