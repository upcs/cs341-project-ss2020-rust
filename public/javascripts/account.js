/**
 * account.js
 * @author Geryl Vinoya, Kama Simon, Pele Kamala, Mikey Antkiewicz
 * @version 02April2020
 */

 /**
  * @desc updates display when edit/save button is clicked
  */
function editMode() {
	// div variables 
	var btn = document.getElementById('edit-btn');
	var bioDiv = document.getElementById('bio-div');
	var nameDiv = document.getElementById('name-div');
	if (btn.innerHTML == "Save Profile") { // button - transition to saving profile 
		var fTextArea = document.getElementById('first-text');
		var lTextArea = document.getElementById('last-text');
		var bTextArea = document.getElementById('bio-text');
		var username = localStorage.getItem('username');
		var first = fTextArea.value;
		var last = lTextArea.value;
		var bio = bTextArea.value;
		btn.innerHTML = "Edit Profile"; // changing button
		$.post("/updateaccount?username=" + username + "&fname=" + first + "&lname=" + last + "&bio=" + bio,
			function (user) {
				// changing name, removing textarea
				document.getElementById('name').innerHTML = user[0].FIRSTNAME + " " + user[0].LASTNAME;
				nameDiv.removeChild(fTextArea);
				nameDiv.removeChild(lTextArea);

				// changing bio, removing textarea 
				var para = document.createElement("p");
				para.innerHTML = user[0].BIO;
				para.id = "bio";
				bioDiv.removeChild(bTextArea);
				bioDiv.appendChild(para);
			});
	}
	else { // button - transition to editing profile
		var name = document.getElementById('name').innerHTML;
		var matches = name.match(/([A-Z][a-z]*) ([A-Z][a-z]*)/);
		if (matches) { // creating textarea for first and last name
			var first = document.createElement("textarea");
			first.innerHTML = matches[1];
			first.id = "first-text";
			var last = document.createElement("textarea");
			last.innerHTML = matches[2];
			last.id = "last-text";
			nameDiv.appendChild(first);
			nameDiv.appendChild(last);
		}
		// creating textarea for bio
		var bio = document.getElementById('bio');
		var bioTextArea = document.createElement("textarea");
		bioTextArea.innerHTML = bio.innerHTML;
		bioTextArea.id = 'bio-text';
		bioDiv.appendChild(bioTextArea);
		bioDiv.removeChild(bio);
		btn.innerHTML = "Save Profile"; // changing button
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
	evt.currentTarget.className += " active";
}

function initUser() {
	username = localStorage.getItem('username');
	if (username != null) {
		$.post("/initacct?username=" + username, function (user) {
			document.getElementById('name').innerHTML = user[0].FIRSTNAME + " " + user[0].LASTNAME;
			document.getElementById('bio').innerHTML = user[0].BIO;
		});
		document.getElementById("default").click();
		getFavorites();
	} //retrieve info needed
	else{
		window.location.replace("/404.html");
	}
}

/**
 * @desc changes user password when button is clicked 
 */
function changePassword() {
	// retrieve input by account user 
	var oldpw = document.getElementById('old-pw').value;
	var newpw = document.getElementById('new-pw').value;
	if(oldpw == newpw){
		alert("Current password entry is the same as new password. Hana hou!"); 
		return; 
	}
	// post to change password from USER table 
	$.post("/changePassword?username=" + localStorage.getItem('username') + "&old=" + oldpw + "&new=" + newpw,
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

/**
 * @desc retrieves users favorite's list 
 */
function getFavorites() {
	var username = localStorage.getItem('username'); // saved username 

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
				if (entry == "0") {
					cat = "Artwork";
				}
				else if (entry == "1") {
					cat = "Outdoor Activities";
				}
				else if (entry == "2") {
					cat = "Community Service";
				}
				else {
					cat = "Events";
				}
				table.innerHTML += "<tr> <td>" + cat + "</td> <td>" +
					title + "</td></tr>";
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

/**
 * @desc table sorter 
 * @param {*} n index
 */
function sortTable(n) {
	var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	table = document.getElementById("myTable");
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
}

// end of account.js