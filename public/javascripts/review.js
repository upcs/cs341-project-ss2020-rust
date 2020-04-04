/**
 * review.js
 * @author Geryl Vinoya, Kama Simon, Pele Kamala, Mikey Antkiewicz
 * @version 02April2020
 */


 /**
  * @desc attempt to submit review to REVIEW table on db 
  */
function submitReview() {
    var reviewerName = (document.getElementById('name')).value;
    var category = (document.getElementById('categoryOptions')).value; // TODO: how to select category
    var item = (document.getElementById('titleOptions')).value;
    var rating = getRating();
    alert(category);
    if(validSubmission()){
        $.post("/addReview?name='" + reviewerName + "'&cat='" + category + "'&item='" + item + "'"
        + "&rating=" + rating, function(result){

        });
    }

}

/**
 * @desc determine if review submission is valid 
 * @return bool: true if valid, false if invalid entry 
 */
function validSubmission(){
    var category = (document.getElementById('categoryOptions')).value;
    var item = (document.getElementById('titleOptions')).value;
    if(category == ''){
        alert("No category was selected.");
        return false;
    }
    if(item == ''){
        alert("No item to rate was selected.");
        return false;
    }
    return true; 
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
                itemOptions += "<option>" + list[i].NAME + "</option>";
            }
            items.innerHTML = itemOptions;
        });
    }
    else if (value == "service") {
        var itemOptions = "";
        $.post('/retrieve?type=service', function (list) {
            for (var i = 0; i < list.length; i++) {
                itemOptions += "<option>" + list[i].NAME + "</option>";
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

// end of review.js