# fatmind
MEVN note taking app.

This project was created to create a second brain to save sensitive and trivial information. The original criteria was that it would never store any information externally on the internet/cloud. 
This platform I decided on was:
1. Local MongoDB database stored on your computer - this is the master 
2. Express/NodeJS API to communitate with database
3. VueJS front end client to add and search for notes
4. iOS App client to add and search for notes (see fatmind-ios repo)
5. Currently the iOS app has data syncing for create and update functionality (delete comming soon)

The end goal is to have a central server with only the MongoDB database on a Raspberry Pi. Then all clients will sync with it. 

## How to run
This app runs on docker containers.

Configure app:
- copy config file /fatmind-api/config.js.example to new file config.js 
- copy config file /fatmind-web/src/js/fatmind.config.js.example to new file fatmind.config.js
- run:  docker-compose up
- create a mongodb database called fatmind or whatever you want
