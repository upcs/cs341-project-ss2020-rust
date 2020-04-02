var map;
function init() {
    $.post('/retrieve?type=art', function (art) { // POST for art info
        // loop through all art objects 
        var titleList = new Array();

        for (var i = 1; i < art.length; i++) {
            if (art[i].TITLE != '') { // don't want art with no title
                // object title
                var title = art[i].TITLE;


                if (!titleList.includes(title)) {

                    titleList.push(title);

                    // create row
                    var x = document.createElement("TR");
                    x.setAttribute("id", "'entry" + i + "'");

                    var latitude = art[i].LATITUDE;
                    var longitude = art[i].LONGITUDE;
                    var location = {lat: latitude, lng: longitude};
                    addRowListener(x, location);

                    // add to table
                    document.getElementById("arttable").appendChild(x);

                    // create column w/ info
                    var y = document.createElement("TD");

                    // put newly created element in the art class
                    y.className = "artclass";

                    var t = document.createTextNode(title);
                    y.appendChild(t);
                    document.getElementById("'entry" + i + "'").appendChild(y);
                }

            }
        }
    });
}

function addRowListener(row, location){
    row.addEventListener('click', function () {
        if(map.getZoom() < 20)
            map.setZoom(20);
        map.panTo(location);
    });
}

//search art function
function search_art() {
    let input = document.getElementById('searchbar_input_art').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('artclass');
    
    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = "none";
        }
        else {
            x[i].style.display = "table-cell";
        }
    }


}

var activeInfoWindow;

function favoriteButton(user, title) {
    $.post("/retrieveFavorite?user=" + user, function (result) {
        var foundTitle = false;
        if (result[0].FAVORITES != null) {
            var favoriteList = (result[0].FAVORITES).split(",");
            for (var i = 0; i < favoriteList.length; i++) {
                if (favoriteList[i].substring(1) == title) {
                    foundTitle = true;
                }
            }
        }
        if (foundTitle) {
            removeItem(user, title);
            var content = activeInfoWindow.getContent();
            content = content.slice(0, -21);
            content = content +';</span></div></div>';
            activeInfoWindow.setContent(content);
            waitForChange(result[0].FAVORITES);
        } else{
            addItem(user, title);
            var content = activeInfoWindow.getContent();
            content = content.slice(0, -20);
            content = content +'f;</span></div></div>';
            activeInfoWindow.setContent(content);
            waitForChange(result[0].FAVORITES);
        }
    });
}

function waitForChange(prevResult){
    var user = localStorage.getItem("username");
    $.post("/retrieveFavorite?user=" + user, function (result) {
        if(result[0].FAVORITES == prevResult){
            waitForChange(prevResult);
        } else{
            loadFavorites();
        }
    });
}

function initFavorite(user, title){
    $.post("/retrieveFavorite?user=" + user, function (result) {
        var foundTitle = false;
        if (result[0].FAVORITES != null) {
            var favoriteList = (result[0].FAVORITES).split(",");
            for (var i = 0; i < favoriteList.length; i++) {
                if (favoriteList[i].substring(1) == title) {
                    foundTitle = true;
                }
            }
        }
        var content = activeInfoWindow.getContent();
        content = content.slice(0, -20);
        if(content.substring(content.length - 1) == "f"){
            content = content.slice(0, -1);
        }
        if (foundTitle) {
            content = content +'f;</span></div></div>';
            activeInfoWindow.setContent(content);
        } else{
            content = content +';</span></div></div>';
            activeInfoWindow.setContent(content);
        }
    });
}

/*
FIXED ISSUE WITH NOT GOING IN ADDITEM AND REMOVEITEM FUNCTION
https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function.
*/
function addItem(user, title) {
    $.post("/changeFavorites?type=add&cat=art&user=" + user + "&title=" + title, function (result) {
    });
    
}

function removeItem(user, title) {
    $.post("/changeFavorites?type=remove&user=" + user + "&title=0" + title, function (result) {
    });
    
}

var markers = [];

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
        var user = localStorage.getItem('username');
        if (user != null) { //if their is a user we initialize their favorites
            loadFavorites();
        }
    });
}

function createMarker(pos, name, description, access, creator, credit, date){
    var marker = new google.maps.Marker({title: name, position: pos, map: map, icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      }});
    markers.push(marker);
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

function loadFavorites(){
    var showFavorites = localStorage.getItem('showFavorites');
    if(showFavorites == "false"){
        document.getElementById("toggleFavoritesButton").innerHTML = '&star;';
        for (var i = 0; i < markers.length; i++) {
            markers[i].setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
        }
        return;
    }
    if(showFavorites == null){
        localStorage.setItem("showFavorites", "true");
    }
    document.getElementById("toggleFavoritesButton").innerHTML = '&starf;';
    var user = localStorage.getItem('username');
    var artFavorites = [];
    $.post("/retrieveFavorite?user=" + user, function (result) {
        if (result[0].FAVORITES != null) {
            var favoriteList = (result[0].FAVORITES).split(",");
            for (var i = 0; i < favoriteList.length; i++) {
                if (favoriteList[i][0] == '0') {
                    var titleName = favoriteList[i].substring(1);
                    artFavorites.push(titleName);
                }
            }
            var artFavoritesLength = artFavorites.length;
            var match;
            for(var i = 0; i < markers.length; i++){
                match = false;
                for(var j = 0; j < artFavorites.length; j++){
                    if(markers[i].getTitle() == artFavorites[j]){
                        match = true;
                    }
                }
                if(match){
                    markers[i].setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png');
                } else{
                    markers[i].setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
                }
            }
        } else{
        } // do nothing no favorites
    });
}

function toggleFavoritesButton(){
    var showFavorites = localStorage.getItem('showFavorites');
    if(showFavorites == "true"){
        localStorage.setItem("showFavorites","false");
        loadFavorites();
    } else if(showFavorites == "false"){
        localStorage.setItem("showFavorites","true");
        loadFavorites();
    }
}

/*
    version: 23 FEB 2020
    TODO: have list scrollable, while info display is fixed on page
*/