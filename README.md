[![Build Status](https://travis-ci.org/upcs/sprint-0-sq19-kamala21.svg?branch=master)](https://travis-ci.org/upcs/sprint-0-sq19-kamala21) [![codecov](https://codecov.io/gh/upcs/cs341-project-ss2020-rust/branch/master/graph/badge.svg)](https://codecov.io/gh/upcs/cs341-project-ss2020-rust)

Software Requirements Specification
for
Makaleha
Version 1.0 approved
Prepared by <Pele K., Geryl V., Michael A., Kama S., Grant S.>
<Rust>
<4 February 2020>

















Table of Contents
Table of Contents......................................................................................................................... ii
Revision History..................................................................................................................... ii
1.   Introduction..................................................................................................................... 1
2.   Overall Description........................................................................................................... 1
2.1       Product Perspective......................................................................................................... 1
2.2       Product Features............................................................................................................ 1
2.3       User Classes and Characteristics........................................................................................ 1
2.4       Design and Implementation Constraints....................................................................................... 1
2.5       User Documentation......................................................................................................... 2
3.   Use Cases........................................................................................................................ 2
3.1       Making a review............................................................................................................ 2
3.2       Create Makaleha account.................................................................................................. 2
3.3       Log in...................................................................................................................... 2
3.4       See Hawai’i Artwork......................................................................................................... 3
3.5       Save an Event or Artwork................................................................................................. 3
3.6       View Saved Events or Artwork......................................................................................... 3
3.7       Upload Image to Event...................................................................................................... 3
3.8       View an Event’s Location................................................................................................. 3
3.9       View Information on Artwork........................................................................................... 4
3.10      Change Account Profile Picture........................................................................................ 4
4.   External Interface Requirements......................................................................................... 4
4.1       User Interfaces............................................................................................................. 4
4.2       Software Interfaces........................................................................................................ 5
5.   Nonfunctional Requirements................................................................................................ 6
5.1       Performance Requirements................................................................................................. 6
5.2       Safety Requirements........................................................................................................ 6
5.3       Security Requirements....................................................................................................... 6
5.4       Software Quality Attributes................................................................................................. 6
6.   Other Requirements.............................................................................................................. 6
Appendix A: Glossary.................................................................................................................. 6
Appendix B: Issues List............................................................................................................... 6
 
 
Revision History
Name	Date	Reason For Changes	Version
 	 	 	 
 	 	 	 
 
 

















1.    Introduction
Using maps interlaced with all types of data from various databases has been a key tool in efficiently organizing and displaying information to users for years. This technology has become optimized to an extreme point where google maps seems to have mapped every road and building on the face of the planet. All of this innovation and integration has padded modern day lives with loads of convenience. With that being said, the internet is now cluttered with an overwhelming amount of information that can prove ineffective when using the internet to do things such as plan a trip or find something new about the place you live. Our software will combine maps and databases to provide a seamless experience to finding exactly what you want to do in the beautiful island of O’ahu, Hawaii. With a simple-to-use interface, users will be able to search through databases to find new and reliable sources of entertainment on the island. This is of great importance because with this strict focus on providing the best experience for those who want to get the most out of their time in O’ahu, we will outshine the other products that have more of a global focus.
2.    Overall Description
2.1    Product Overview
Currently if you search for things to do in Honolulu or O’ahu the internet provides countless websites telling the user the things that they should see in their time there. Our product will replace this dynamic by asking the user what they want to do and then showing them the top-rated results based on that.  This will allow the user to waste less time looking at attractions that do not interest them and allows easy access to the best entertainment tethered to the user's personal taste. In addition, users who live on the island or visit it frequently will have a place to go to explore the less obvious attractions. Our software will better traverse the databases to pick up niche activities that are otherwise left unearthed by other sources.
2.2    Product Features
Our product provides the function of easily displaying artwork and other entertaining destinations in the city of Honolulu. If a user wishes to add an event, art piece, or destination they can do so after verification. With the simplicity of our product, it is as simple as the user directly interacting with our cultivated database in either a search or contribution regard.
2.3    User Classes and Characteristics
There are three user classes for our product. The hierarchy of user classes goes administrative, contributor, and casual. The casual class will have the permission to browse the app and see the contents of the databases through the user interface. The contributor class will have the added functionality of being able to submit entries to be verified and then added to our database. The administrative class will have the capability to verify new submissions, delete obsolete information from the database, and add new categories to the database.
2.4    Design and Implementation Constraints
Constraints surrounding this project align with the constraints of the Google Cloud Storage, SQL regulations, and the imported databases.
2.5    User Documentation
There will be a user manual to explain how to navigate the website.  There will be a help document that explains how to submit an entry.
3.    Use Cases
3.1    Making a review
Actor: User
Pre-conditions: Has visited Diamond Head
Description:
1.	Go to website http://makaleha.com 
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
1.	Go to website http://makaleha.com 
2.	Click on Sign up tab
3.	Enter name, email, and password
4.	Click on sign up
5.	Message pops up: “Maika’i! You’ve successfully created a Maka leha account.”
3.3    Log in
Actor: User
Pre-conditions: Has created an account
Description:
1.	Go to website http://makaleha.com 
2.	Click on log in tab
3.	Enter email and password
4.	Click on log in
5.	Tab has new features for account holder
3.4    See Hawai’i artwork
Actor: User
Pre-conditions: none
Description:
1.	Go to website http://makaleha.com
2.	Scroll to bottom of page
3.	Click on image with header “Artwork”
4.	Scroll through artwork
3.5   Save an Event or Artwork
Actor: User
Pre-conditions: Has account, is logged in
Description:
1.	Click on event
2.	Click on star icon to save event 
3.6    View Saved Events or Artwork
Actor: User
Pre-conditions: Has account, is logged in
Description:
1.	Click on upper right tab labeled Account
2.	Click on Saved tab
3.	View events or artwork saved
3.7    Upload Image to Event
Actor: User
Pre-conditions: Has been to event, has taken a picture of event, is logged in, at event page
Description:
1.	Click on review tab
2.	Write a review or rating, or both
3.	Click on Attachment icon
4.	Select image
5.	Press ‘Ok’
6.	Click on Submit
3.8    View an Event’s Location
Actor: User
Pre-conditions: none
Description:
1.	Go to website http://makaleha.com
2.	Search desired event
3.	Click Map on event page
4.	Map opens and shows pinpoint of location
3.9    View Information on Artwork 
Actor: User
Pre-conditions: none
Description:
1.	Go to website http://makaleha.com
2.	Search desired artwork
3.	Click on Info tab
4.	View information like address, history, etc. 
3.10    Change Account Profile Picture 
Actor: User
Pre-conditions: has account, is logged in
Description:
1.	Click on account tab
2.	Click on Profile picture icon 
3.	Upload desired image as profile picture
4.	Press ‘Ok’
5.	Default picture is changed to desired one.
4.    External Interface Requirements
4.1    User Interfaces
From the home page, returning users can log in via the button at the top right. This will bring up a small log in box where the software will take the username/email and password to search for an existing account. Once the user is successfully logged in, they will be taken to the map page. From there the user can allow his location to the software, which will refocus the map on their area. This will be a window that pops up over the map, returning users who have already allowed their location may skip this. The user can search from the panel on the left and categorize their search. This will search the database of art and entertainment, accordingly. Categories will be decided based on the data from the database. A user can click on the result on the left panel or a pin on the map, both leading to the next popup screen. There they can read reviews about the location, see the rest of the description if needed, and write a review. Writing a review will consist of a similar screen, except with the top review empty for them to fill out.
   
4.2    Software Interfaces
The main software component that our application depends on is the public art data set from data.honolulu.gov. Makaleha software will read the data from the chart, which consists of the creator, credit, date, description, location, and image. The most difficult part is then connecting this data to a map using the location given. The data set includes latitude and longitude coordinates that will be used to plot each location. The other information will then be organized onto a form to appear in the search results from the search panel and when you click to view a location from the map. There may be additional database connections to expand our application to show more than just art. For example, there is similar data set from data.honolulu.gov that has “Exceptional Trees”. Makaleha will also depend on using a Google API key for obtaining a map on the site, and for the ability to find the locations on the map. 
5.    Nonfunctional Requirements
5.1    Performance Requirements
Average response time to update user location should be less than one second. For use of the application when traveling to get accurate directions to a desired location.  We will not require page reloading with map updates, so that less data is reloaded.
We do have one small delay when using the favoriting button. It takes 2-3 seconds for the "ping" on the map to change from yellow and back.
All other delays or website crash issues are through our deployment app, Heroku, since it is a free-to-use service.
5.2    Safety Requirements
User locations will all remain in client-side data, to ensure that the location of users cannot be breached and used against them.
5.3    Security Requirements
User login information will be hashed to protect user login info and any other info that we will be storing. We have also updated the requirements needed to create a "good" password that would be harder to guess.
5.4    Software Quality Attributes
We will be adding more points of interest in time when they are discovered and viewing customer feedback on locations with negative reviews and removing those from our database.
6.    Other Requirements
There are no further requirements needed to address. 
Appendix A: Glossary
Mahalo: Thanks
Maika’i: Good
Makaleha: To look about as in wonder or admiration, to glance. 
Appendix B: Issues List

