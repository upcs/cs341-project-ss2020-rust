/**
 * category_template.js
 * @author Geryl Vinoya, Kama Simon, Pele Kamala, Mikey Antkiewicz
 * @version 25April2020
 */

// global variables 
var map; // google map
var cat; // page category (i.e. art, service, events, outdoor)
var activeInfoWindow; // each item's info window
var markers = []; // map marker array 
var user; // current username

/**
 * @desc initializes page with table entries from db tables
 * @param {*} category the page category 
 */
function init(category) { // function called on window load
    cat = category; // initialize global variable
    user = localStorage.getItem('username'); // initialize user
    var curr = window.location.pathname; // current path name
    var path = verifyURL(user, curr, cat); // verify URL
    if (path != curr) {
        window.location.replace(path); // need to redirect page
    }
    initItems(); // initialize table entries 
}

/**
 * @desc initialize table entries
 */
function initItems() {
    // post to retrieve table entries 
    $.post(`/retrieve?type=${cat}`, function (list) {
        // loop through all objects 
        var titleList = new Array();

        for (var i = 0; i < list.length; i++) {
            if (list[i].TITLE != '') { // don't want category entries with no title
                // object title
                var title = list[i].TITLE;


                if (!titleList.includes(title)) {

                    titleList.push(title);

                    // create row
                    var x = document.createElement('TR');

                    x.className = 'categoryrow';

                    x.setAttribute('id', `entry${i}`);
                    if (list[i].hasOwnProperty('LATITUDE') && list[i].hasOwnProperty('LONGITUDE')) {
                        var latitude = list[i].LATITUDE;
                        var longitude = list[i].LONGITUDE;
                        var location = { lat: latitude, lng: longitude };
                        addRowListener(x, location);
                    }
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
    });
}

/******************************* SEARCH FUNCTIONS ***********************************/
/**
 * @desc search function to find entries in table
 */
function search_table() {
    let input = document.getElementById('searchbar_input').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('categoryclass');
    let z = document.getElementsByClassName('categoryrow');

    let y = 0;

    let noResult = document.getElementById('result');

    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = 'none';

            z[i].style.display = 'none';


            y++;
            if (y == x.length) {
                result.style.visibility = 'visible';
            }
        }
        else {
            x[i].style.display = 'table-cell';
            z[i].style.display = 'table-row';
            result.style.visibility = 'hidden';
        }
    }
}

/******************************* FAVORITES FUNCTIONS ***********************************/
/**
 * @desc initializing favorites 
 * @param {*} user username
 * @param {*} title title of entry
 */
function initFavorite(user, title) {
    $.post(`/retrieveFavorite?user=${user}`, function (result) {
        var foundTitle = false;
        if (result[0].FAVORITES != null) {
            var favoriteList = (result[0].FAVORITES).split(',');
            for (var i = 0; i < favoriteList.length; i++) {
                if (favoriteList[i].substring(1) == title) {
                    foundTitle = true;
                }
            }
        }
        var content = activeInfoWindow.getContent();
        var split = content.split('</span>');
        content = split[0].slice(0, -1);
        if (content.substring(content.length - 1) == 'f') {
            content = content.slice(0, -1);
        }
        if (foundTitle) {
            content = content + 'f;</span>' + split[1];
            activeInfoWindow.setContent(content);
        } else {
            content = content + ';</span>' + split[1];
            activeInfoWindow.setContent(content);
        }
    });
}

/**
 * @desc adding favorite button (star) to infoWindow
 * @param {*} user username
 * @param {*} title the title to retrieve 
 */
function favoriteButton(user, title) {
    $.post(`/retrieveFavorite?user=${user}`, function (result) {
        var foundTitle = false;
        if (result[0].FAVORITES != null) {
            var favoriteList = (result[0].FAVORITES).split(',');
            for (var i = 0; i < favoriteList.length; i++) {
                if (favoriteList[i].substring(1) == title) {
                    foundTitle = true;
                }
            }
        }
        if (foundTitle) {
            removeItem(user, title);
            var content = activeInfoWindow.getContent();
            var x = content.split('</span>');
            content = x[0].slice(0, -2);
            content = content + ';</span>' + x[1];
            activeInfoWindow.setContent(content);
            waitForChange(result[0].FAVORITES);
        } else {
            addItem(user, title);
            var content = activeInfoWindow.getContent();
            var x = content.split('</span>');
            content = x[0].slice(0, -1);
            content = content + 'f;</span>' + x[1];
            activeInfoWindow.setContent(content);
            waitForChange(result[0].FAVORITES);
        }
    });
}

function waitForChange(prevResult) {
    $.post(`/retrieveFavorite?user=${user}`, function (result) {
        if (result[0].FAVORITES == prevResult) {
            waitForChange(prevResult);
        } else {
            loadFavorites();
        }
    });
}

/**
 * @desc loading favorites on map 
 */
function loadFavorites() {
    var showFavorites = localStorage.getItem('showFavorites');
    if (showFavorites == 'false') {
        document.getElementById('toggleFavoritesButton').innerHTML = '&star;';
        for (var i = 0; i < markers.length; i++) {
            markers[i].setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
        }
        return;
    }
    if (showFavorites == null) {
        localStorage.setItem('showFavorites', 'true');
    }
    document.getElementById('toggleFavoritesButton').innerHTML = '&starf;';
    var artFavorites = [];
    var catValue = getCategoryValue(cat);
    if(catValue == -1){ alert("Error at line 211"); return; }
    $.post(`/retrieveFavorite?user=${user}`, function (result) {
        if (result[0].FAVORITES != null) {
            var favoriteList = (result[0].FAVORITES).split(',');
            for (var i = 0; i < favoriteList.length; i++) {
                if (favoriteList[i][0] == catValue) {
                    var titleName = favoriteList[i].substring(1);
                    artFavorites.push(titleName);
                }
            }
            var match;
            for (var i = 0; i < markers.length; i++) {
                match = false;
                for (var j = 0; j < artFavorites.length; j++) {
                    if (markers[i].getTitle() == artFavorites[j]) {
                        match = true;
                    }
                }
                if (match) {
                    markers[i].setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png');
                } else {
                    markers[i].setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
                }
            }
        } else {
        } // do nothing no favorites
    });
}

/**
 * @desc add toggle favorite functionality on top of map, either shows favorites or not 
 */
function toggleFavoritesButton() {
    var showFavorites = localStorage.getItem('showFavorites');
    if (showFavorites == 'true') {
        localStorage.setItem('showFavorites', 'false');
        loadFavorites();
    } else if (showFavorites == 'false') {
        localStorage.setItem('showFavorites', 'true');
        loadFavorites();
    }
}

/*
FIXED ISSUE WITH NOT GOING IN ADDITEM AND REMOVEITEM FUNCTION
https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function.
*/
/**
 * @desc adding item to user favorites 
 * @param {*} user username
 * @param {*} title title to add
 */
function addItem(user, title) {
    $.post(`/changeFavorites?type=add&cat=${cat}&user=${user}&title=${title}`, function (result) {
    });
}

/**
 * @desc removing item from user favorites 
 * @param {*} user username
 * @param {*} title title to remove
 */
function removeItem(user, title) {
    var catValue = getCategoryValue(cat);
    if(catValue == -1){ console.log('Error at line 287'); return; }
    $.post(`/changeFavorites?type=remove&user=${user}&title=${catValue}${title}`, function (result) {
    });
}

/******************************* MAP FUNCTIONS ***********************************/
/**
 * @desc adding event listener to specific locations 
 * @param {*} row table row entry on click
 * @param {*} location the longitude and latitude value of row entry 
 */
function addRowListener(row, location) {
    row.addEventListener('click', function () {
        if (map.getZoom() < 20)
            map.setZoom(20);
        map.panTo(location);
    });
}
/**
 * @desc initializes map on page 
 */
function initMap() {
    cat = document.getElementsByClassName('category')[0].id;

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 21.4689, lng: -158.0001 },
        zoom: 10.25
    });
    $.post(`/retrieve?type=${cat}`, function (list) { // POST for art info
        // loop through all art objects 
        for (var i = 0; i < list.length; i++) {
            if (list[i].TITLE != '') { // don't want art with no title
                // object title
                var title = list[i].TITLE;
                var location;
                var description;
                var content;
                var latitude = list[i].LATITUDE;
                var longitude = list[i].LONGITUDE;
                location = { lat: latitude, lng: longitude };
                if (cat == "art") {
                    description = list[i].DESCRIPTION;
                    var access = list[i].ACCESS;
                    var creator = list[i].CREATOR;
                    var credit = list[i].CREDIT;
                    var date = list[i].DATE;
                    content = getArtContent(description, access, creator, credit, date);
                    createMarker(location, title, content);

                }
                else if (cat == "service") {
                    description = list[i].DESCRIPTION;
                    var phone = list[i].PHONE;
                    var website = list[i].WEBSITE;
                    content = getServiceContent(description, phone, website);
                    createMarker(location, title, content);
                }
                else if (cat == "outdoor") {
                    var island = list[i].ISLAND;
                    var length = list[i].LENGTH;
                    var elevation = list[i].ELEVATION;
                    var start = list[i].START;
                    var end = list[i].END;
                    var difficulty = list[i].DIFFICULTY;
                    var amenities = list[i].AMENITIES;
                    content = getOutdoorContent(island, length, elevation, start, end, difficulty, amenities);
                    createMarker(location, title, content);
                }
                else if (cat == "events") {
                    description = list[i].DESCRIPTION;
                    var addr = list[i].LOCATION;
                    var startdate = list[i].STARTDATE;
                    var enddate = list[i].ENDDATE;
                    var starttime = list[i].STARTTIME;
                    var endtime = list[i].ENDTIME;
                    content = getEventContent(addr, description, startdate, enddate, starttime, endtime);
                    createMarker(location, title, content);
                }
            }
        }
        if (user != null) { //if their is a user we initialize their favorites
            loadFavorites();
        }
    });
}

/**
 * @desc creates marker on map 
 * @param {*} pos location of marker
 * @param {*} name name of marker
 * @param {*} text text to input in infoWindow
 */
function createMarker(pos, name, text) {
    var marker = new google.maps.Marker({
        title: name, position: pos, map: map, icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        }
    });
    markers.push(marker);
    var favoriteButton = "";
    //alert('3');
    //var user = localStorage.getItem('username');
    if (user != null) {
        favoriteButton = '<span class="favoriteButton" onclick="favoriteButton(\'' + user + '\', \'' + name + '\')">&star;</span>';
    }
    var newTitle = convertString(name);
    $.post(`/getReview?type=${cat}&title=${newTitle}`, function (list) {
        var rev = '';
        var cList = [];
        if (list.length != 0) {
            var total = 0;
            for (var i = 0; i < list.length; i++) {
                total += list[i].AVGREVIEW;
                if (list[i].COMMENT != null) {
                    cList.push(`<tr class='review-tr'><td class='review-td'><h3>${list[i].NAME}</h3>Rating: \
                    ${list[i].AVGREVIEW}<p>Comments:</p><p>${list[i].COMMENT}</p></td></tr>`);
                }
                else {
                    cList.push(`<tr class='review-tr'><td class='review-td'><h3>${list[i].NAME}</h3>Rating: \
                    ${list[i].AVGREVIEW}</td></tr>`);
                }
            }
            var avg = (total / list.length).toFixed(2);
            rev = `<p>Average Review: ${avg}/5</p>`;
        }
        else {
            rev = '<p>Average Review: Not available</p>'
        }
        var comment_section = '<h2>REVIEWS</h2><p>None</p>';
        if (cList.length != 0) {
            comment_section = '<h2>REVIEWS</h2><table class="review-tb">';
            for (var i = 0; i < cList.length; i++) {
                comment_section += `${cList[i]}`;
            }
        }
        var content = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">' +
            name +
            '</h1>' +
            '<div id="bodyContent">' + rev + text + // need to add back "comment_section" TODO: FIX FAVORITE BUTTON BUG
            favoriteButton + comment_section +
            '</div>' +
            '</div>';
        var infowindow = new google.maps.InfoWindow({
            content: content
        });
        google.maps.event.addListener(marker, 'click', function () {
            if (map.getZoom() < 15)
                map.setZoom(15);
            map.panTo(marker.getPosition());
            if (activeInfoWindow) {
                activeInfoWindow.close();
            }
            infowindow.open(map, marker);
            activeInfoWindow = infowindow;
            if (user != null) {
                initFavorite(user, name);
            }
        });
    });
}


/******************************* HELPER FUNCTIONS ***********************************/
function convertString(str) {
    var list = str.split("'");
    var newStr = '';
    for (var i = 0; i < list.length; i++) {
        if (i != list.length - 1) {
            newStr += list[i] + "\\'";
        }
        else {
            newStr += list[i];
        }
    }
    return newStr;
}

/** BELOW ARE THE FUNCTIONS RELATED TO CREATING THE TEXT CONTENT TO PLACE IN INFOWINDOW  */
function getArtContent(description, access, creator, credit, date) {
    var creatorCreditDate = "";
    var content = '';
    if (creator != "") {
        if (credit != "") {
            if (date != "") {
                creatorCreditDate = '<p>' +
                    creator + ', ' + credit + ', ' + date +
                    '</p>';
            } else {
                creatorCreditDate = '<p>' +
                    creator + ', ' + credit +
                    '</p>';
            }
        } else {
            if (date != "") {
                creatorCreditDate = '<p>' +
                    creator + ', ' + date +
                    '</p>';
            } else {
                creatorCreditDate = '<p>' +
                    creator +
                    '</p>';
            }
        }
    } else {
        if (credit != "") {
            if (date != "") {
                creatorCreditDate = '<p>' +
                    credit + ', ' + date +
                    '</p>';
            } else {
                creatorCreditDate = '<p>' +
                    credit +
                    '</p>';
            }
        } else {
            if (date != "") {
                creatorCreditDate = '<p>' +
                    date +
                    '</p>';
            }
        }
    }
    content += '<p>' + description + '</p>' + creatorCreditDate + '<p>' + " Access: " + access +
        '</p>';
    return content;
}

function getOutdoorContent(island, length, elevation, start, end, difficulty, amenities) {
    var content = '';
    if (island != '') {
        content += '<p>Island: ' + island + '</p>';
    }
    if (length != '') {
        content += '<p>Distance: ' + length + ' mi</p>';
    }
    if (elevation != '') {
        content += '<p>Elevation: ' + elevation + ' ft</p>';
    }
    if (start != '') {
        content += '<p>Starting Point: ' + start + '</p>';
        if (end != '') {
            content += '<p>End Point: ' + end + '</p>';
        }
    }
    if (difficulty != '') {
        content += '<p>Difficulty Level: ' + difficulty + '</p>';
    }
    if (amenities != '') {
        content += '<p>Amenities: ' + amenities + '</p>';
    }
    return content;
}

function getEventContent(addr, description, startdate, enddate, starttime, endtime) { // TODO: need to implement startdate and enddate
    var content = '';
    content += '<p>' + addr + '</p>'
    content += '<p>' + description + '</p>';
    return content;
}

function getServiceContent(description, phone, website) {
    var content = '';
    content += '<p>' + description + '</p>';
    content += '<p>' + phone + ' ' + website + '</p>';
    return content;
}

function verifyURL(user, curr, cat) {
    var next = curr;
    if (user != null) { // only can access user pages 
        next = `/${cat}pageUser.html`;
    }
    else { // only can access non-user pages 
        next = `/${cat}page.html`;
    }
    return next;
}

function getCategoryValue(cat) {
    var catValue = -1;
    switch (cat) { // TODO?: This can be FUNC
        case 'art': catValue = '0';
            break;
        case "service": catValue = '2';
            break;
        case "events": catValue = '3';
            break;
        case "outdoor": catValue = '1';
            break;
    }
   return catValue; 
}

module.exports =
{
    verifyURL,
    getServiceContent,
    getEventContent,
    getOutdoorContent,
    getArtContent,
    search_table,
    convertString,
    getCategoryValue
};
// end of category_template.js