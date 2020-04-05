[![Build Status](https://travis-ci.org/upcs/sprint-0-sq19-kamala21.svg?branch=master)](https://travis-ci.org/upcs/sprint-0-sq19-kamala21) [![codecov](https://codecov.io/gh/upcs/cs341-project-ss2020-rust/branch/master/graph/badge.svg)](https://codecov.io/gh/upcs/cs341-project-ss2020-rust)

Software Requirements Specification for Makaleha

Version 2.0 approved

Prepared by <Pele Kamala, Geryl Vinoya, Mikey Antkiewicz, Kama Simon>

<Rust>
 
<4 April 2020>

Table of Contents

Table of Contents........................................................................................................ ii

Revision History......................................................................................................... ii

1.   Introduction......................................................................................................... 1

2.   Overall Description.................................................................................................. 1

2.1       Product Perspective............................................................................................. 1

2.2       Product Features................................................................................................ 1

2.3       User Classes and Characteristics................................................................................ 1

2.4       Design and Implementation Constraints........................................................................... 1

2.5       User Documentation.............................................................................................. 2

3.   Use Cases............................................................................................................ 2

3.1       Making a review................................................................................................. 2

3.2       Create Makaleha account......................................................................................... 2

3.3       Log in.......................................................................................................... 2

3.4       See Hawai’i Artwork............................................................................................. 3

3.5       Save an Event or Artwork........................................................................................ 3

3.6       View Saved Events or Artwork.................................................................................... 3

3.7       Make a review on an Artwork..................................................................................... 3

3.8       View an Event’s Location........................................................................................ 3

3.9       View Information on Artwork..................................................................................... 4

3.10      Change Account Name............................................................................................. 4

4.   External Interface Requirements...................................................................................... 4

4.1       User Interfaces................................................................................................. 4

4.2       Software Interfaces............................................................................................. 5

5.   Nonfunctional Requirements........................................................................................... 6

5.1       Performance Requirements........................................................................................ 6

5.2       Safety Requirements............................................................................................. 6

5.3       Security Requirements........................................................................................... 6

5.4       Software Quality Attributes..................................................................................... 6

6.   Other Requirements................................................................................................... 6

Appendix A: Glossary...................................................................................................... 6

Appendix B: Issues List................................................................................................... 6
 
 
Revision History
Name	           Date	       Reason For Changes	      Version

Kamalei Simon 	4 April 2020	New features and release	2.0 	 	 	 
 	 	 	 
1.    Introduction
Using maps interlaced with all types of data from various databases has been a key tool in efficiently organizing and displaying information to users for years. This technology has become optimized to an extreme point where google maps seems to have mapped every road and building on the face of the planet. All of this innovation and integration has padded modern day lives with loads of convenience. With that being said, the internet is now cluttered with an overwhelming amount of information that can prove ineffective when using the internet to do things such as plan a trip or find something new about the place you live. Our software will combine maps and databases to provide a seamless experience to finding exactly what you want to do in the beautiful island of O’ahu, Hawaii. With a simple-to-use interface, users will be able to search through databases to find new and reliable sources of entertainment on the island. This is of great importance because with this strict focus on providing the best experience for those who want to get the most out of their time in O’ahu, we will outshine the other products that have more of a global focus.
2.    Overall Description
2.1    Product Overview
Currently, if a user searches for things to do in Hawai’i, the internet provides countless travel websites providing the top-rated beaches and expensive activities to visit when traveling there. Our product will replace the cliché travel websites with an interactive tool allowing for users to learn more about the islands and view free events, outdoor activities, and local art in Hawai’i. Furthermore, Hawai’i is all about sustainable practices and acknowledgment to giving back to the ʻāina, which our product displays community service events tourist and local residents can participate in. Our software will better traverse the databases to pick up niche activities that are otherwise left unearthed by other sources.
2.2    Product Features
The major features our product contains are displaying events, artwork, and outdoor activities in a scrollable table aside an interactive map that allows user to see the location and information of each item, user login which processes saved items to be revisited at a later date, and the ability to review each item, as desired. 
2.3    User Classes and Characteristics
There are three user classes for our product. The hierarchy of user classes goes administrative, contributor, and casual. The casual class will have the permission to browse the app and see the contents of the databases through the user interface. The contributor class will have the added functionality of being able to submit entries to be verified and then added to our database and the ability to add items as “favorites” to account. The administrative class will have the capability to verify new submissions, delete obsolete information from the database, and add new categories to the database.
2.4    Design and Implementation Constraints
Constraints surrounding this project align with the constraints of the Google Cloud Storage, SQL regulations, and the imported databases.
2.5    User Documentation
There will be a user manual to explain how to navigate the website.  There will be a help document that explains how to submit an entry.

3.    Use Cases
3.1    Making a review
Actor: User
Pre-conditions: Has visited Diamond Head
Description:
1.	Go to website 
2.	Click on Write a Review tab
3.	Type “Diamond Head Hike” into search bar and leave location as default, “Honolulu, HI”
4.	Click search button
5.	Click on Diamond Head Hike tab, and enter review or rating or both
6.	Click submit
7.	Message pops up: “Mahalo for your review!”
3.2    Create Makaleha account 
Actor: User
Pre-conditions: Has email.
Description:
1.	Go to website 
2.	Click on Register tab
3.	A window pops up for user input 
4.	Enter name, email, username, and password
5.	Click on register
6.	Message pops up: “Maika’i! You’ve successfully created a Maka leha account.”
7.	Page redirects to home page
3.3    Log in
Actor: User
Pre-conditions: Has created an account
Description:
1.	Go to website 
2.	Click on log in tab
3.	Enter username and password
4.	Click on log in
5.	Upper right tab has new features: Account and Log out 
3.4    See Hawai’i artwork
Actor: User
Pre-conditions: none
Description:
1.	Go to website 
2.	Click on tab “Artwork”
3.	View items in artwork table and the map 
3.5   Save an Event or Artwork
Actor: User
Pre-conditions: Has account, is logged in
Description:
1.	Click on Events tab
2.	Click on item from table
3.	Click on blue marker
4.	Click on unfilled yellow star
3.6    View Saved Events or Artwork
Actor: User
Pre-conditions: Has account, is logged in
Description:
1.	Click on upper right tab labeled Account
2.	Click on Favorites tab
3.	View events or artwork saved
3.7    Make a review on an Artwork
Actor: User
Pre-conditions: Is logged in, has seen art 
Description:
1.	Click on write a review tab
2.	Select ‘Artwork’ from category
3.	Select an item from newly populated dropdown menu 
4.	Click the number of stars you will rate that artwork
5.	Click on Submit
3.8    View an Event’s Location
Actor: User
Pre-conditions: none
Description:
1.	Go to website 
2.	Search desired event
3.	Click Map on event page
4.	Map opens and shows pinpoint of location
3.9    View Information on Artwork 
Actor: User
Pre-conditions: none
Description:
1.	Go to website 
2.	Search desired artwork
3.	Click on marker
4.	View information like address, history, etc. 
3.10    Change Account Name 
Actor: User
Pre-conditions: has account, is logged in
Description:
1.	Click on account tab
2.	Click on edit profile
3.	Change name text area 
4.	Click on save profile 

4.    External Interface Requirements
4.1    User Interfaces
From the home page, returning users can log in via the button at the top right. This will bring up a small log in box where the software will take the username/email and password to search for an existing account. Once the user is successfully logged in, they will be redirected to home page. From there the user can allow his location to the software, which will refocus the map on their area. This will be a window that pops up over the map, returning users who have already allowed their location may skip this. The user can search from the panel on the left and categorize their search. This will search the database of art and entertainment, accordingly. Categories will be decided based on the data from the database. A user can click on the result on the left panel or a pin on the map, both leading to the next popup screen. There they can read reviews about the location, see the rest of the description if needed, and write a review. Writing a review will consist of a similar screen, except with the top review empty for them to fill out.
   
4.2    Software Interfaces
The main software component that our application depends on is the public art data set from data.honolulu.gov. Makaleha software will read the data from the chart, which consists of the creator, credit, date, description, location, and image. The most difficult part is then connecting this data to a map using the location given. The data set includes latitude and longitude coordinates that will be used to plot each location. The other information will then be organized onto a form to appear in the search results from the search panel and when you click to view a location from the map. There may be additional database connections to expand our application to show more than just art. For example, there is similar data set from data.honolulu.gov that has “Exceptional Trees”. Makaleha will also depend on using a Google API key for obtaining a map on the site, and for the ability to find the locations on the map. 
5.    Nonfunctional Requirements
5.1    Performance Requirements
Average response time to update user location should be less than one second. For use of the application when traveling to get accurate directions to a desired location.  We will not require page reloading with map updates, so that less data is reloaded.
5.2    Safety Requirements
User locations will all remain in client-side data, to ensure that the location of users cannot be breached and used against them.
5.3    Security Requirements
User login information will be hashed to protect user login info and any other info that we will be storing.
5.4    Software Quality Attributes
We will be adding more points of interest in time when they are discovered and viewing customer feedback on locations with negative reviews and removing those from our database.
6.    Other Requirements
There are no further requirements needed to address. 
Appendix A: Glossary
Mahalo: Thanks
Maika’i: Good
Makaleha: To look about as in wonder or admiration, to glance. 
ʻāina: land
Appendix B: Issues List

