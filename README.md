# RoomFinder
Android Application for finding rooms
	
	Features:
	1. Find rooms on the basis of location.
	2. Put a room on rent with few clicks.
	3. Rooms are shown on maps surronding the selected location.
	4. Single sign on using facebook login.

	Technologies used:
	1. Database: Neo4j graph database
	2. Image database: Namecheap shared web hosting
	3. Cloud server: Amazon web services EC2 
	4. Maps: Openstreet maps with Leaflet JS library
	5. Frontend Application framework: Jquery Mobile
	6. Phonegap plugins: Camera, Geolocation, inAppBrowser, fileTransfer
	7. Facebook login library: OpenFB.js
	8. Maps location database: photon.komoot.de

	Prerequisite for generating APK 
	1. Android SDK can be downloaded from http://developer.android.com/sdk/index.html
	2. Phonegap
	3. Nodejs package manager

	Installing the application
	1. Fetch all the files into your local repository.
	2. In the shell/command prompt navigate to the repository in which the fetched project is located.
	3. execute following command to build the apk
		 	phonegap build android
	Note: to build the apk Android SDK must be installed and ANDROID_HOME PATH variable must be set to android sdk directory
	4. Once can also test the app using follwing command:
		phonegap serve
	Note: for the above command phonegap application must be installed from the play store.
