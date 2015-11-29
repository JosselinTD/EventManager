# EVENT MANAGEMENT

Event-management is a Web App using the MEAN Stack to provide an event management system. Add a new event, modify an existing one and search through all events.

If you want to navigate through the history without modifying the source code, the AngularJS code is garanteed to work only in the [Milestone AngularJS] commit.

## Dependencies

Event-management is building over the MEAN Stack. You will need to install some tools in order to deploy it :

* MongoDB
* NodeJS
* NPM
* Bower

## Installation steps

Once tools are installed and MongoDB is running, you will have to run a few console command in the project folder :

* Run > npm install
* Run > bower install angular#1.4.8
* Run > bower install bootstrap
* Run > bower install angular-resource#1.4.8
* Run > bower install angular-bootstrap
* Run > npm start
* Go to http://localhost:3000/

## Modification steps

If you want to modify the source code, you will need to install some more tools in order to compile all the Angular code into the file "module.js" :

* Run > npm install gulp
* Run > npm install gulp-concat
* Run > npm install gulp-clean
* Run > gulp