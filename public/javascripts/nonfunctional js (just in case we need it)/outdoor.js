var map;
function init() {
    $.post('/retrieve?type=outdoor', function (outdoor) { // POST for outdoor info

        // loop through all outdoor objects 

        var titleList = new Array();

        for (var i = 1; i < outdoor.length; i++) {
            if (outdoor[i].NAME != '') { // don't want outdoor with no title
                // object title
                var title = outdoor[i].NAME;


                if (!titleList.includes(title)) {

                    titleList.push(title);

                    // create row
                    var x = document.createElement("TR");
                    x.setAttribute("id", "'entry" + i + "'");

                    // add to table
                    document.getElementById("rectable").appendChild(x);


                    // create column w/ info
                    var y = document.createElement("TD");

                    // put newly created element in the outdoor class
                    y.className = "outdoorclass";

                    var t = document.createTextNode(title);
                    y.appendChild(t);
                    document.getElementById("'entry" + i + "'").appendChild(y);
                }

            }
        }
        // add eventlistener to all outdoor rows
        var allRowsOnPage = document.querySelectorAll('TD');
        allRowsOnPage.forEach(function (row, index) {
            row.addEventListener('click', function () {
                displayInfo(row.innerHTML); // when clicked display outdoor info
            });
        });
        /*
        Purpose: To add event listener to all outdoor, not just last one
        https://www.nickang.com/add-event-listener-for-loop-problem-in-javascript/
        */
        // add table to display outdoor info
        var infoTable = document.createElement("TABLE");
        infoTable.setAttribute("width", "700");
        infoTable.setAttribute("id", "infotable");
        document.getElementById('displaytext').appendChild(infoTable);
        var x = document.createElement("TR");
        x.setAttribute("id", "row");
        document.getElementById("infotable").appendChild(x);
        var y = document.createElement("TD");
        y.setAttribute("id", "textinfo");
        var t = document.createTextNode("");
        y.appendChild(t);
        document.getElementById("row").appendChild(y);
    });
}

function displayInfo(title) { // display outdoor info
    /* BEGINNING: ADD THIS PORTION TO OTHER RETRIEVAL PAGES FOR ESCAPE CHAR ISSUE */
    var newtitle = '';
    for (var i = 0; i < title.length; i++) { // needed this because & is a reserved character
        if (title[i] == "&") {
            newtitle += "%26";
            i += 4;
        }
        else {
            newtitle += title[i];
        }
    }
    /* END OF ADDING */
    /*
    CITATION: https://stackoverflow.com/questions/16622504/escaping-ampersand-in-url
    Needed to understand why & was not passing through URL parameter. 
    */
    $.post("/retrieveInfo?type=outdoor&title=" + newtitle, function (info) {
        document.getElementById('textinfo').innerHTML = '';


        if (info[0] != null) { // NEED TO CHANGE THIS DEPENDING ON OUTDOOR TABLE
            // FAVORITES BUTTON FUNCTIONALITY TO BE ADDED LATER
            var user = localStorage.getItem('username');
            if (user != null) {
                checkFavorites(user, newtitle);
            }
            var island = "<p> Located on the island of " + info[0].ISLAND + " in " + info[0].DISTRICT + ". </p>";
            var len = "<p> ELEVATION: " + info[0].ELEVATION + " ft DISTANCE: " + info[0].LENGTH + " mi </p>";
            document.getElementById('textinfo').innerHTML = "<h2>" + title + "</h2>" + island + len;
        }
    });
}

//search outdoor function
function search_outdoor() {
    let input = document.getElementById('searchbar_input_rec').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('outdoorclass');
    
    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = "none";
        }
        else {
            x[i].style.display = "table-cell";
        }
    }


}

function checkFavorites(user, title) {
    $.post("/retrieveFavorite?user=" + user + "&title=" + title, function (result) {
        var foundTitle = false;
        if (result[0].FAVORITES != null) {
            favoriteList = (result[0].FAVORITES).split(",");
            for (var i = 0; i < favoriteList.length; i++) {
                if (favoriteList[i] == title) {
                    foundTitle = true;
                }
            }
        }
        if (foundTitle) {
            document.getElementById('textinfo').innerHTML += "<button id='fav' class='saved-btn'> FAVORITE </button><br><br>";
            document.getElementById("fav").addEventListener('click', removeItem, false);
            document.getElementById("fav").username = user;
            document.getElementById("fav").title = title;

        }
        else {
            document.getElementById('textinfo').innerHTML += "<button id='fav' class='unsaved-btn'> FAVORITE </button><br><br>";
            document.getElementById("fav").addEventListener('click', addItem, false);
            document.getElementById("fav").username = user;
            document.getElementById("fav").title = title;
        }
    });
}
/*
FIXED ISSUE WITH NOT GOING IN ADDITEM AND REMOVEITEM FUNCTION
https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function.
*/
function addItem(evt) {
    var user = evt.currentTarget.username;
    var title = evt.currentTarget.title;
    $.post("/changeFavorites?type=add&user=" + user + "&title=" + title, function (result) {
    });
    displayInfo(title);
}

function removeItem(evt) {
    var user = evt.currentTarget.username;
    var title = evt.currentTarget.title;
    $.post("/changeFavorites?type=remove&user=" + user + "&title=" + title, function (result) {
    });
    displayInfo(title);
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 21.4689, lng: -158.0001},
        zoom: 10.25
    });
    $.post('/retrieve?type=art', function (art) { // POST for art info
        // loop through all art objects 
        for (var i = 1; i < art.length; i++) {
            if (art[i].TITLE != '') { // don't want art with no title
                // object title
                var title = art[i].TITLE;
                var latitude = art[i].LATITUDE;
                var longitude = art[i].LONGITUDE;
                var location = {lat: latitude, lng: longitude};
                var description = art[i].DESCRIPTION;
                var access = art[i].ACCESS;
                var creator = art[i].CREATOR;
                var credit = art[i].CREDIT;
                var date = art[i].DATE;
                createMarker(location, title, description, access, creator, credit, date);
            }
        }
    });
}
function createMarker(pos, name, description, access, creator, credit, date){
    var marker = new google.maps.Marker({title: name, position: pos, map: map});
    var creatorCreditDate = "";
    if(creator != ""){
        if(credit !=""){
            if(date != ""){
                creatorCreditDate = '<p>'+
                creator+ ', '+ credit+ ', '+ date+
                '</p>';
            } else{
                creatorCreditDate = '<p>'+
                creator+ ', '+ credit+
                '</p>';
            }
        } else{
            if(date != ""){
                creatorCreditDate = '<p>'+
                creator+ ', '+ date+
                '</p>';
            } else{
                creatorCreditDate = '<p>'+
                creator+
                '</p>';
            }
        }
    } else{
        if(credit !=""){
            if(date != ""){
                creatorCreditDate = '<p>'+
                credit+ ', '+ date+
                '</p>';
            } else{
                creatorCreditDate = '<p>'+
                credit+
                '</p>';
            }
        } else{
            if(date != ""){
                creatorCreditDate = '<p>'+
                date+
                '</p>';
            }
        }
    }
    var favoriteButton = "";
    var user = localStorage.getItem('username');
    if (user != null) {
        favoriteButton = '<span class="favoriteButton" onclick="favoriteButton(\''+user+'\', \''+name+'\')">&star;</span>';
    }
    var content = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading">'+
    name+
    '</h1>'+
    '<div id="bodyContent">'+
    '<p>'+
    description+
    '</p>'+
    creatorCreditDate+
    '<p>'+
    " Access: "+
    access+
    '</p>'+
    favoriteButton+
    '</div>'+
    '</div>'
    var infowindow = new google.maps.InfoWindow({
        content: content
    });
    google.maps.event.addListener(marker, 'click', function() {
        if(map.getZoom() < 15)
            map.setZoom(15);
        map.panTo(marker.getPosition());
        if (activeInfoWindow){
            activeInfoWindow.close();
        }
        infowindow.open(map, marker);
        activeInfoWindow = infowindow;
        if (user != null) {
            initFavorite(user, name);
        }
    }); 
}



/*
    version: 23 FEB 2020
    TODO: have list scrollable, while info display is fixed on page
*/