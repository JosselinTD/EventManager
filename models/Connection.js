var Mongoose = require('mongoose');

exports.db = Mongoose.createConnection('localhost', 'event-management');