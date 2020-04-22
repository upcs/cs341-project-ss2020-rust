/**
 * review.js
 * @author Geryl Vinoya, Kama Simon, Pele Kamala, Mikey Antkiewicz
 * @version 22April2020
 */


 /**
  * @desc attempt to submit review to REVIEW table on db 
  */
function submitReview() {
    var reviewerName = convertString(document.getElementById('name').value); // name input (can be empty)
    var category = document.getElementById('categoryOptions').value; // category 
    var item = convertString(document.getElementById('titleOptions').value); // item/title
    var comment = convertString(document.getElementById('comments').value); // comment input (can be empty)
    var rating = getRating(); // rating
    if(validSubmission()){ // checks if submission is valid 
        $.post(`/addReview?name='${reviewerName}'&cat='${category}'&item='${item}'&comm='${comment}'&rating=${rating}`, 
        function(result){
        });
        alert('Thank you for your submission.'); // alerts user that POST was successful
    }

}

 /**
  * @desc converts special characters ' and & to work when accessing db
  * @return new converted string
  */
function convertString(str){
    var new_str = '';
    new_str = checkAmp(str); 
    new_str = checkCom(new_str); 
    return new_str; 
}

 /**
  * @desc converts special characters ' to work when accessing db
  * @return new converted string
  */
function checkCom(str){
    var list = str.split("'");
    var newStr = '';
    for(var i = 0; i < list.length; i++){
        if (i != list.length - 1) {
            newStr += list[i] + "\\'";
        }
        else {
            newStr += list[i];
        }
    }
    return newStr; 
}

 /**
  * @desc converts special characters & to work when accessing db
  * @return new converted string
  */
function checkAmp(str){
    var list = str.split("&");
    var newStr = '';
    for(var i = 0; i < list.length; i++){
        if (i != list.length - 1) {
            newStr += list[i] + "\\&";
        }
        else {
            newStr += list[i];
        }
    }
    return newStr; 
}

/**
 * @desc determine if review submission is valid 
 * @return bool: true if valid, false if invalid entry 
 */
function validSubmission(){
    var category = (document.getElementById('categoryOptions')).value;
    var rating = getRating(); 
    var bool = true; 
    if(category == ''){
        document.getElementById('cat-err').style.display = 'block'; // show error message
        bool = false; 
    }
    if(rating == 0){
        document.getElementById('rate-err').style.display = 'block'; // show error message
        bool = false; 
    }
    return bool; 
}

/**
 * @desc converting star rating to computable value 
 * @return the int value rating 
 */
function getRating() {
    var total = 0;
    var star5 = document.getElementById('5');
    var star4 = document.getElementById('4');
    var star3 = document.getElementById('3');
    var star2 = document.getElementById('2');
    var star1 = document.getElementById('1');
    switch ("rgb(255, 199, 0)") {
        case (window.getComputedStyle(star5)).getPropertyValue('color'):
            total = 5;
            break;
        case (window.getComputedStyle(star4)).getPropertyValue('color'):
            total = 4;
            break;
        case (window.getComputedStyle(star3)).getPropertyValue('color'):
            total = 3;
            break;
        case (window.getComputedStyle(star2)).getPropertyValue('color'):
            total = 2;
            break;
        case (window.getComputedStyle(star1)).getPropertyValue('color'):
            total = 1;
            break;
        default:
            total = 0;
    }
    return total;
}

/**
 * @desc populate selection dropdown menu for different titles 
 * @param {*} value page category 
 */
function getItems(value) {
    var items = document.getElementById('titleOptions');
    if (value == "art") {
        var itemOptions = "";
        $.post('/retrieve?type=art', function (list) {
            for (var i = 1; i < list.length; i++) {
                if (list[i].TITLE != '') {
                    itemOptions += "<option>" + list[i].TITLE + "</option>";
                }
            }
            items.innerHTML = itemOptions;
        });
    }
    else if (value == "outdoor") {
        var itemOptions = "";
        $.post('/retrieve?type=outdoor', function (list) {
            for (var i = 1; i < list.length; i++) {
                itemOptions += "<option>" + list[i].TITLE + "</option>";
            }
            items.innerHTML = itemOptions;
        });
    }
    else if (value == "service") {
        var itemOptions = "";
        $.post('/retrieve?type=service', function (list) {
            for (var i = 0; i < list.length; i++) {
                itemOptions += "<option>" + list[i].TITLE + "</option>";
            }
            items.innerHTML = itemOptions;
        });
    }
    else if (value == "events") {
        var itemOptions = "";
        $.post('/retrieve?type=events', function (list) {
            for (var i = 0; i < list.length; i++) {
                itemOptions += "<option>" + list[i].TITLE + "</option>";
            }
            items.innerHTML = itemOptions;
        });
    }
}

function commentCount(x){
    var text = x.value; // comment section
    var used = 0; // used characters
    var rem = 300; // remaining characters
    for(var i = 0; i < text.length; i++){
        used++; 
    }
    rem -= used; 
    document.getElementById('rem-mess').textContent = `${rem} remaining characters`; // updates remaining characters
    return rem; 
}

module.exports = {getRating, validSubmission, checkAmp, checkCom, convertString, commentCount}; 
// end of review.js
