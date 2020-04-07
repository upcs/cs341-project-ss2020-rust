var map;
function init() {
    $.post('/retrieve?type=service', function (service) { // POST for art info
        // loop through all art objects 
        var titleList = new Array();

        for (var i = 0; i < service.length; i++) {
            if (service[i].NAME != '') { // don't want art with no title
                // object title
                var title = service[i].NAME;


                if (!titleList.includes(title)) {

                    titleList.push(title);

                    // create row
                    var x = document.createElement("TR");
                    x.setAttribute("id", "'entry" + i + "'");

                    var latitude = service[i].LATITUDE;
                    var longitude = service[i].LONGITUDE;
                    var location = {lat: latitude, lng: longitude};
                    addRowListener(x, location);

                    // add to table
                    document.getElementById("servicetable").appendChild(x);

                    // create column w/ info
                    var y = document.createElement("TD");

                    // put newly created element in the art class
                    y.className = "serviceclass";

                    var t = document.createTextNode(title);
                    y.appendChild(t);
                    document.getElementById("'entry" + i + "'").appendChild(y);
                }

            }
        }
        // add table to display art info
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

function addRowListener(row, location) {
    row.addEventListener('click', function () {
        if (map.getZoom() < 20)
            map.setZoom(20);
        map.panTo(location);
    });
}
var activeInfoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 21.4689, lng: -158.0001 },
        zoom: 10.25
    });
    $.post('/retrieve?type=service', function (service) { // POST for art info
        // loop through all art objects 
        for (var i = 0; i < service.length; i++) {
            if (service[i].NAME != '') { // don't want art with no title
                // object title
                var longitude = service[i].LONGITUDE;
                var latitude = service[i].LATITUDE;
                var location = { lat: latitude, lng: longitude };
                var address = service[i].LOCATION;
                var description = service[i].DESCRIPTION;
                var title = service[i].NAME;
                var phone = service[i].PHONE; 
                var website = service[i].WEBSITE; 
                createMarker(title, location, description, address, phone, website);
            }
        }
    });
}

function createMarker(name, location, description, address, phone, website) {
    var marker = new google.maps.Marker({ title: name, position: location, map: map });
    var favoriteButton = "";
    var user = localStorage.getItem('username');
    if (user != null) {
        favoriteButton = '<span class="favoriteButton" onclick="favoriteButton(\'' + user + '\', \'' + name + '\')">&star;</span>';
    }
    var content = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">' +
        name +
        '</h1>' +
        '<div id="bodyContent">' +
        '<p>' + address + '</p>' +
        '<p>' +
        description +
        '</p>' +
        '<p>' + phone + '</p>' +
        '<p>' + website + '</p>' + 
        favoriteButton +
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
}

//search art function
function search_service() {
    let input = document.getElementById('searchbar_input_serv').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('serviceclass');
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
function addItem(user, title) {
    $.post("/changeFavorites?type=add&cat=service&user=" + user + "&title=" + title, function (result) {
    });
}

function removeItem(user, title) {
    $.post("/changeFavorites?type=remove&user=" + user + "&title=" + title, function (result) {
    });
}