var Mongoose = require("mongoose");
var db = require("./Connection.js").db;

var EventSchema = new Mongoose.Schema({
	title: {type: String, required: true},
	description: {type: String, required: true},
	date: {type: String, required: true},
	logo: {type: String, required: true}
});

var Event = db.model("event", EventSchema);

Event.find({}, function(error, events){
	if(!events.length){
		var events = [
	  		new Event({
	  			title: "dotJS",
	  			description: "The largest JavaScript conference in Europe",
	  			date: "2015/12/07",
	  			logo: "http://www.dotjs.io/images/logos/dotjs/big-logo.png"
	  		}),
	  		new Event({
	  			title: "Hackathon E-Résidents",
	  			description: "Devs, makers, designers, data scientists – get ready to hack! Dalkia, Intent Technologies and BeMyApp invite you to a hackathon with sustainability at its core. The concept is to take a bunch of data related to residents and their energy usage and, using your savvy, develop the ultimate e-resident solution to improve the daily lives of tenants. In this four-step event, submit your idea online using the ideation platform, then attend a workshop with our team of experts, during which you’ll form into teams. Next up is a fiercely competitive 48-hour hackathon), where the most successful teams will share a prize of €15,000, plus begin a two-month incubation with Dalkia. The event will be held at l’USINE IO in Paris, a building fully connected to deliver energy-related data. With this, your resulting e-resident apps will help future tenants live more sustainably. Quite the payoff, right?",
	  			date: "2016/02/07",
	  			logo: "http://www.mtbela.com/resources/uploads/Dalkia.jpg"
	  		}),
	  		new Event({
	  			title: "Workshop: AngularJS workshop",
	  			description: "AngularJS brings testable architectural patterns to applications built with HTML 5. This course explains and demonstrates the many features of AngularJS, including directives, filters, routing, controllers, templates, services, views. But, the best applications need more than a single framework. We’ll also learn about responsive design, Bootstrap, and the latest HTML 5 features including local storage, the canvas, web workers, web sockets, and more.",
	  			date: "2016/06/15",
	  			logo: "http://www.w3schools.com/angular/pic_angular.jpg"
	  		})
	  	],
	  		total = events.length,
  			result = [];

		function saveAll(){
		  var event = events.pop();

		  event.save(function(err, saved){
		    if (err) throw err;//handle error

		    result.push(saved[0]);

		    if (--total) saveAll();
		  });
		}

		saveAll();
	}
});

exports.Event = Event;