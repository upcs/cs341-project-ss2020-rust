/**
 * account.js
 * @author Geryl Vinoya, Kama Simon, Pele Kamala, Mikey Antkiewicz
 * @version 25April2020
 */
 
 // TODO: Fix load time of user info 
 // TODO: REMOVE EVENT HISTORY
 // TODO: ADD FUNCTIONALITY TO ACCOUNT PAGE: REVIEWS
/**
* @desc table sorter 
* @param {*} n index
*/
function sortTable(n, el) {
	var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	table = document.getElementById(el);
	switching = true;
	//Set the sorting direction to ascending:
	dir = "asc";
	/*Make a loop that will continue until
	no switching has been done:*/
	while (switching) {
		//start by saying: no switching is done:
		switching = false;
		rows = table.rows;
		/*Loop through all table rows (except the
		first, which contains table headers):*/
		for (i = 1; i < (rows.length - 1); i++) {
			//start by saying there should be no switching:
			shouldSwitch = false;
			/*Get the two elements you want to compare,
			one from current row and one from the next:*/
			x = rows[i].getElementsByTagName("TD")[n];
			y = rows[i + 1].getElementsByTagName("TD")[n];
			/*check if the two rows should switch place,
			based on the direction, asc or desc:*/
			if (dir == "asc") {
				if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
					//if so, mark as a switch and break the loop:
					shouldSwitch = true;
					break;
				}
			} else if (dir == "desc") {
				if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
					//if so, mark as a switch and break the loop:
					shouldSwitch = true;
					break;
				}
			}
		}
		if (shouldSwitch) {
			/*If a switch has been marked, make the switch
			and mark that a switch has been done:*/
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			//Each time a switch is done, increase this count by 1:
			switchcount++;
		} else {
			/*If no switching has been done AND the direction is "asc",
			set the direction to "desc" and run the while loop again.*/
			if (switchcount == 0 && dir == "asc") {
				dir = "desc";
				switching = true;
			}
		}
	}
	return true; 
}

/**
 * @desc updates display when edit/save button is clicked
 */
function editMode() {
	// div variables 
	var btn = document.getElementById('edit-btn');
	var fname = document.getElementById('fname').value;
	var lname = document.getElementById('lname').value;
	var loc = document.getElementById('loc').value;
	var bio = document.getElementById('new_bio').value;
	if (btn.innerHTML == "Save Profile") { // button - transition to saving profile 
		var username = getUsername();
		saveProfile(username, fname, lname, bio, loc);
		btn.innerHTML = "Edit Profile"; // changing button
		toggle('off');
	}
	else { // button - transition to editing profile
		setForm();
		toggle('on');
		btn.innerHTML = "Save Profile"; // changing button
	}
}

function setForm() {
	var list = splitList(document.getElementById('name').innerHTML, ' ');
	var fname = list[0];
	var lname = list[1];
	document.getElementById('fname').value = fname;
	document.getElementById('lname').value = lname;
	document.getElementById('loc').value = document.getElementById('location').innerHTML;
	document.getElementById('new_bio').value = document.getElementById('bio').innerHTML;
	document.getElementById("av-menu").selectedIndex = getIndex();
}
function getIndex() {
	var source = document.getElementById('avtr').src;
	if(source.includes("img_avatar2.png")){
		return "0"; 
	}
	else if(source.includes("img_avatar.png")){
		return "1"; 
	}
	else if(source.includes("penguin.png")){
		return "2";
	}
	else{
		return "3"; 
	}
}
function saveProfile(username, fname, lname, bio, location) {
	var avatar = setAvatar();
	$.post(`/updateaccount?username=${username}&fname=${fname}&lname=${lname}&bio=${bio}&loc=${location}&av=${avatar}`,
		function (user) {
			document.getElementById('name').innerHTML = `${user[0].FIRSTNAME} ${user[0].LASTNAME}`;
			document.getElementById('bio').innerHTML = user[0].BIO;
			document.getElementById('location').innerHTML = user[0].LOCATION;
			if (user[0].AVATAR == '' || user[0].AVATAR == null) {
				// do nothing 
			}
			else {
				document.getElementById('avtr').src = user[0].AVATAR;
			}
		});
}

function setAvatar() {
	var e = document.getElementById('av-menu');
	var newAv = e.options[e.selectedIndex].value;
	document.getElementById('avtr').src = newAv;
	return newAv;
}

function toggle(x) {
	var def = document.getElementById("default-prof");
	var form = document.getElementById('prof-form');
	if (x == 'off') {
		form.style.display = 'none';
		def.style.display = 'block';
	}
	else if (x == 'on') {
		def.style.display = 'none';
		form.style.display = 'block';
	}
}
/**
 * @desc displays tabs on left side (profile, favorite, password)
 * @param {*} event 
 * @param {*} tab specifies tab name
 */
function openAccTab(event, tab) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(tab).style.display = "block";
	event.currentTarget.className += " active";
}

function initUser() {
	username = getUsername();
	if (username != null) {
		$.post("/initacct?username=" + username, function (user) {
			document.getElementById('name').innerHTML = user[0].FIRSTNAME + " " + user[0].LASTNAME;
			document.getElementById('bio').innerHTML = checkNull(user[0].BIO);
			document.getElementById('location').innerHTML = checkNull(user[0].LOCATION);
			document.getElementById('avtr').src = defaultAv(user[0].AVATAR);
		});
		document.getElementById("default").click();
		getFavorites();
	} //retrieve info needed
	else {
		window.location.replace("/404.html");
		return false;
	}
}
function defaultAv(str){
	var av = '/images/img_avatar2.png';
	if(str != null && str != ''){
		av = str; 
	}
	return av; 
}
function checkNull(str){
	var newStr = ''; 
	if(str != null){
		newStr = str; 
	}
	return newStr; 
}
/**
 * @desc changes user password when button is clicked 
 */
function changePassword() {
	// retrieve input by account user 
	var oldpw = document.getElementById('old-pw').value;
	var newpw = document.getElementById('new-pw').value;
	if (!validPassword(localStorage.getItem('username'), oldpw, newpw)) {
		return false; 
	}
	else {
		// post to change password from USER table 
		$.post("/changePassword?username=" + getUsername() + "&old=" + oldpw + "&new=" + newpw,
			function (user) {
				if (user == null) {
					alert("Incorrect password. Hana hou!"); // notify user that incorrect password was entered 
				}
				else {
					alert("Maika'i! You've successfully changed password."); // notify user that correct password was entered
					// reset input area 
					document.getElementById('old-pw').value = '';
					document.getElementById('new-pw').value = '';
				}
			});
	}
}

function validPassword(user, old_pw, new_pw) {
    if (user == new_pw) {
		alert("Current password entry is the same as username. Hana hou!");
        return false; 
	}
	if(old_pw == new_pw){
		alert("Current password entry is the same as new password. Hana hou!");
		return false; 
	}
    if (new_pw.length < 8) {
		alert("New password needs to be at least length of 8. Hana hou!");
        return false;
    }
    else if (new_pw.length > 33) {
		alert("New password needs to be less than length of 33. Hana hou!");
        return false;
    }
    var oneUpper = /.*[A-Z].*/
    var oneDigit = /.*[0-9].*/
	var oneSpecial = /.*[-\_\.\$\#\@\!].*/
    if(oneUpper.test(new_pw) && oneDigit.test(new_pw) && oneSpecial.test(new_pw)){
        return true; 
    }
    else{
		alert("New password needs to have at least one uppercase letter, one digit, and one special character (-,_,.,$,#,@,!) Hana hou!");
        return false; 
	}
}

/**
 * @desc retrieves users favorite's list 
 */
function getFavorites() {
	var username = getUsername(); // saved username 

	// post to retrieve favorites 
	$.post('/retrieveFavorite?user=' + username, function (result) {
		if (result[0].FAVORITES != null) {
			// split list 
			var list = splitList(result[0].FAVORITES, ",");
			var table = document.getElementById('myTable');
			var cat = "-1";

			// visually display favorites list
			for (var i = 0; i < list.length; i++) {
				var entry = list[i][0];
				var title = '';
				for (var j = 1; j < list[i].length; j++) {
					title += list[i][j];
				}
				cat = selectCategory(entry);
				table.innerHTML += "<tr> <td>" + cat + "</td> <td>" +
					title + "</td></tr>";
			}
		}
	});
	getReviews();
}

function isEmpty(str){
	if(str == '' || str == null){
		return '';
	}
	else{
		return str; 
	}
}
/**
 * @desc retrieves users favorite's list 
 */
function getReviews() {
	var username = getUsername(); // saved username 

	// post to retrieve favorites 
	$.post('/getReview?user=' + username, function (result) {
		if (result != null) {
			// split list 
			var table = document.getElementById('myReviews');

			// visually display favorites list
			for(var i = 0; i < result.length; i++){
				var cat = selectCategory(result[i].CATEGORY);
				var title = result[i].ITEM;
				var rating = result[i].AVGREVIEW;
				var comments = isEmpty(result[i].COMMENT);
				if(result[i].USER == 'YES'){
					table.innerHTML += `<tr> <td>${cat}</td> <td> \
					${title}</td><td>${rating}</td><td>${comments}</td></tr>`;
				}
			}
		}
	});
}

/**
 * @desc list splitter function
 * @param {*} list the list you want to split
 * @param {*} splitter the string to split at (i.e. every space make a split)
 * @return the splitted list 
 */
function splitList(list, splitter) {
	var l = list.split(splitter);
	return l;
}

function getUsername() {
	var username = localStorage.getItem('username');
	return username;
}

function selectCategory(entry) {
	if (entry == "0" || entry == 'art') {
		cat = "Artwork";
	}
	else if (entry == "1" || entry == 'outdoor') {
		cat = "Outdoor Activities";
	}
	else if (entry == "2" || entry == 'service') {
		cat = "Community Service";
	}
	else {
		cat = "Events";
	}
	return cat;
}

module.exports = 
{ 
	splitList, 
	getUsername, 
	selectCategory, 
	initUser, 
	changePassword,
	setForm,
	getIndex,
	setAvatar,
	toggle,
	checkNull,
	defaultAv,
	validPassword,
	sortTable
 };
// end of account.js