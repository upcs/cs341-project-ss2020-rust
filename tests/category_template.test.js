var fs = require('fs');
var $ = require('jquery');
window.$ = $;
var f = require('../public/javascripts/category_template');

function isStyleVisible(element) {
  const { getComputedStyle } = element.ownerDocument.defaultView

  const { display, visibility, opacity } = getComputedStyle(element)
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

test('search a list', () => {
  var html = fs.readFileSync('public/artpage.html', 'utf8');
  document.body.innerHTML = html;
  addTitles();
  document.getElementById('searchbar_input').value = 'Hello';
  let t = f.search_table();
  var r = document.getElementById('result');
  expect(isElementVisible(r)).toBe(false);
  document.getElementById('searchbar_input').value = '*1*2*3*3*48*%YG*4*0000';
  t = f.search_table();
  r = document.getElementById('result');
  expect(isElementVisible(r)).toBe(true);
});

function addTitles() {
  const list = ["Hello", "Trouble", "Two-thousand", "One"];
  var titleList = new Array();
  for (var i = 0; i < list.length; i++) {
    var title = list[i];
    if (!titleList.includes(title)) {

      titleList.push(title);

      // create row
      var x = document.createElement('TR');

      x.className = 'categoryrow';

      x.setAttribute('id', `entry${i}`);
      // add to table
      document.getElementById('categorytable').appendChild(x);

      // create column w/ info
      var y = document.createElement('TD');

      // put newly created element in the art class
      y.className = 'categoryclass';

      var t = document.createTextNode(title);
      y.appendChild(t);
      document.getElementById(`entry${i}`).appendChild(y);
    }

  }
}