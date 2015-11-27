var Mongoose = require("mongoose");
var db = require("./Connection.js").db;

var EventSchema = new Mongoose.Schema({
	title: {type: String, required: true},
	description: {type: String, required: true},
	date: {type: String, required: true},
	logo: {type: String, required: true}
});

exports.Event = db.model("event", EventSchema);