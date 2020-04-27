# Sprint 5 Requirements
## Improving Runtime
| Page        | Avg Time to Load (s) | Difference Since Last Sprint (s)	|
|-------------|----------------------|----------------------------------|
| Home        | 0.558                |0.558 - 0.565 = -0.007			|
| Events      | 1.866                |1.866 - 1.873 = -0.007			|
| Community   | 1.840                |1.840 - 1.302 =  0.538			|
| Outdoors    | 2.153                |2.153 - 1.439 =  0.714			|
| Artwork     | 3.074                |3.074 - 1.668 =  1.406			|
| About       | 0.587                |0.587 - 0.611 = -0.024			|
## Application Behavior
To speed up the runtime of our pages I sifted through our CSS and Javascript files cleaning out unnessary comments and blank space. Also, I got rid of files and images that we were no longer using. I made these changes because images are a main culprit of adding loading time, and eliminating whitespace in CSS and Javascript files reduces runtime by allowing those files to parse faster. It proved to be effective because our homepage loaded faster despite it having more images than it did on the last sprint. The other pages seem to have slowed down significantly, but this is because the community and outdoors page did not have a map or database on them during the last sprint. Many features have been added that reasonably take time such as adding databases, adding markers for every database entry on our map, and adding a footer to each page that includes a picture. Overall, our website has good runtimes for the amount of features and images included on every page.
## Code Coverage [![Build Status](https://travis-ci.org/upcs/sprint-0-sq19-kamala21.svg?branch=master)](https://travis-ci.org/upcs/sprint-0-sq19-kamala21) [![codecov](https://codecov.io/gh/upcs/cs341-project-ss2020-rust/branch/master/graph/badge.svg)](https://codecov.io/gh/upcs/cs341-project-ss2020-rust)
Our testing is quite adequate. We didn't start testing from the beginning like we should've and only really considered testing during Sprint 4 and Sprint 5. Our coverage is approximately 53% which is really good considering that at the beginning of Sprint 4 we had like no testing. For awhile our test coverage showed 100% but that's because we had not tested any of our functions. All of our testing is on changes to HTML from calling a function or helper functions. We were unable to figure out how to test our POST calls to database. We tried using asynchronous stuff like await but had trouble figuring out how to test that and make sure it was working as needed. I think our testing helped to simplify our functions and to understand what we were trying to achieve with each one. 
## Achieving Specifications
In order to improve some of the security of the logging in and creating an account, we went through the regex for creating all important user fields. The password was made to be more strict than before, so there is at least some amount of complexity in the accounts. We went over small areas that needed fixing and perfected it in sprint 5.
## Security
## Bug Fixes 
For bug fixes, there were many that were the result in our website being incomplete by the end of sprint 4. After reading through all the bugs, they were assigned to whoever was responsible for that specific section. Finishing up everything to a more complete website in the first two weeeks of sprint 5 fixed most of the bugs that were reported.
# Makaleha

## Software Requirements Specification for Makaleha

Version 2.0 approved

## Prepared by Pele Kamala, Geryl Vinoya, Mikey Antkiewicz, Kama Simon

## Team Rust
 
Last Updated: 6 April 2020

## Revision History
Name	              Date	         Reason For Changes	        Version

Kamalei Simon 	  4 April 2020  	New features and release	  2.0 
Mikey Antkiewicz  6 April 2020									  3.0 	 
Geryl Vinoya      26 April 2020	 
 	 	 	 
## 1.    Introduction
Using maps interlaced with all types of data from various databases has been a key tool in efficiently organizing and displaying information to users for years. This technology has become optimized to an extreme point where google maps seems to have mapped every road and building on the face of the planet. All of this innovation and integration has padded modern day lives with loads of convenience. With that being said, the internet is now cluttered with an overwhelming amount of information that can prove ineffective when using the internet to do things such as plan a trip or find something new about the place you live. Our software will combine maps and databases to provide a seamless experience to finding exactly what you want to do in the beautiful island of O’ahu, Hawaii. With a simple-to-use interface, users will be able to search through databases to find new and reliable sources of entertainment on the island. This is of great importance because with this strict focus on providing the best experience for those who want to get the most out of their time in O’ahu, we will outshine the other products that have more of a global focus.

#### Makaleha will be funded by the government of Hawai'i to ensure there will be no bias in which attractions are displayed.

## 2.    Overall Description
### 2.1    Product Overview
Currently, if a user searches for things to do in Hawai’i, the internet provides countless travel websites providing the top-rated beaches and expensive activities to visit when traveling there. Our product will replace the cliché travel websites with an interactive tool allowing for users to learn more about the islands and view free events, outdoor activities, and local art in Hawai’i. Furthermore, Hawai’i is all about sustainable practices and acknowledgment to giving back to the ʻāina, which our product displays community service events tourist and local residents can participate in. Our software will better traverse the databases to pick up niche activities that are otherwise left unearthed by other sources.
### 2.2    Product Features
The major features our product contains are displaying community service opportunities, events, artwork, and outdoor activities in a scrollable table aside an interactive map that allows user to see the location and information of each item, user login which processes saved items to be revisited at a later date, and the ability to review each item, as desired. 
### 2.3    User Classes and Characteristics
There are three user classes for our product. The hierarchy of user classes goes administrative, contributor, and casual. The casual class will have the permission to browse the app and see the contents of the databases through the user interface. The contributor class will have the added functionality of being able to submit entries to be verified and then added to our database and the ability to add items as “favorites” to account. The administrative class will have the capability to verify new submissions, delete obsolete information from the database, and add new categories to the database.
### 2.4    Design and Implementation Constraints
Constraints surrounding this project align with the constraints of the Google Cloud Storage, SQL regulations, and the imported databases.
### 2.5    User Documentation
There will be a user manual to explain how to navigate the website.  There will be a help document that explains how to submit an entry.

## 3.    Use Cases
-Functionality is modeled on artwork page yet can be applied to the following pages:
	-Events
	-Community Service
	-Outdoor Activites
### 3.1    Making a review
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
### 3.2    Create Makaleha account 
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
### 3.3    Log in
Actor: User
Pre-conditions: Has created an account
Description:
1.	Go to website 
2.	Click on log in tab
3.	Enter username and password
4.	Click on log in
5.	Upper right tab has new features: Account and Log out 
### 3.4    See Hawai’i Artwork
Actor: User
Pre-conditions: none
Description:
1.	Go to website 
2.	Click on tab “Artwork”
3.	View items in artwork table and the map 
### 3.5   Save Artwork
Actor: User
Pre-conditions: Has account, is logged in
Description:
1.	Click on Artwork tab
2.	Click on item from table
3.	Click on blue marker
4.	Click on unfilled yellow star
### 3.6    View Saved Artwork
Actor: User
Pre-conditions: Has account, is logged in
Description:
1.	Click on upper right tab labeled Account
2.	Click on Favorites tab
3.	View artwork saved
### 3.7    Make a review on an Artwork
Actor: User
Pre-conditions: Is logged in, has seen art 
Description:
1.	Click on write a review tab
2.	Select ‘Artwork’ from category
3.	Select an item from newly populated dropdown menu 
4.	Click the number of stars you will rate that artwork
5.	Click on Submit
### 3.8    View Artwork's Location
Actor: User
Pre-conditions: none
Description:
1.	Go to website 
2.	Click on the search bar
3.	Search desired event
4.	Click Map on artwork page
5.	Map opens and shows pinpoint of location
### 3.9    View Information on Artwork 
Actor: User
Pre-conditions: none
Description:
1.	Go to website 
2.	Search desired artwork
3.	Click on marker
4.	View information like address, history, etc. 
### 3.10    Change Account Name 
Actor: User
Pre-conditions: has account, is logged in
Description:
1.	Click on account tab
2.	Click on edit profile
3.	Change name text area 
4.	Click on save profile 
### 3.11	Navagate Homepage
Actor: User
Pre-conditions: none
Description:
1.	Go to website
2.	Click on picture above page name
Alternatives:
1.	Click on name of page in navigation bar

## 4.    External Interface Requirements
### 4.1    User Interfaces
From the home page, returning users can log in via the button at the top right. This will bring up a small log in box where the software will take the username/email and password to search for an existing account. Once the user is successfully logged in, they will be redirected to home page. From there the user can allow his location to the software, which will refocus the map on their area. This will be a window that pops up over the map, returning users who have already allowed their location may skip this. The user can search from the panel on the left and categorize their search. This will search the database of art and entertainment, accordingly. Categories will be decided based on the data from the database. A user can click on the result on the left panel or a pin on the map, both leading to the next popup screen. There they can read reviews about the location, see the rest of the description if needed, and write a review. Writing a review will consist of a similar screen, except with the top review empty for them to fill out.
   
### 4.2    Software Interfaces
The main software component that our application depends on is the public art data set from data.honolulu.gov. Makaleha software will read the data from the chart, which consists of the creator, credit, date, description, location, and image. The most difficult part is then connecting this data to a map using the location given. The data set includes latitude and longitude coordinates that will be used to plot each location. The other information will then be organized onto a form to appear in the search results from the search panel and when you click to view a location from the map. There may be additional database connections to expand our application to show more than just art. For example, there is similar data set from data.honolulu.gov that has “Exceptional Trees”. Makaleha will also depend on using a Google API key for obtaining a map on the site, and for the ability to find the locations on the map. 
## 5.    Nonfunctional Requirements
### 5.1    Performance Requirements
#### 5.1.a Browser Compatability
Chrome - Passed
Firefox - Passed
Edge - Passed
Safari - Passed
Safari (mobile) - Failed
#### 5.1.b Load Time
| Page        | Avg Time to Load (s) |
|-------------|----------------------|
| Home        | 0.565                |
| Events      | 1.873                |
| Community   | 1.301                |
| Outdoors    | 1.439                |
| Artwork     | 1.668                |
| About       | 0.611                |

These tests were done using the firefox network analysis tool.
### 5.2    Safety Requirements
User locations will all remain in client-side data, to ensure that the location of users cannot be breached and used against them.
### 5.3    Security Requirements
User login information will be hashed to protect user login info and any other info that we will be storing.
### 5.4    Software Quality Attributes
We will be adding more points of interest in time when they are discovered and viewing customer feedback on locations with negative reviews and removing those from our database.
## 6.    Other Requirements
There are no further requirements needed to address. 
Appendix A: Glossary
Mahalo: Thanks
Maika’i: Good
Makaleha: To look about as in wonder or admiration, to glance. 
ʻāina: land
Appendix B: Issues List

