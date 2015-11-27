var express = require('express');
var router = express.Router();
var moment = require('moment');
var formidable = require('formidable');
var Event = require("../models/Event.js").Event;

var uploadDir = "public/images",
    dateFormat = "YYYY/MM/DD",
    dateSize = dateFormat.length;

function checkRequestContent(fields, files){
  var bad = {code: 400, message:"Missing informations", error:"Missing information"};
  if( !fields.hasOwnProperty('title') || fields.title === "" || 
      !fields.hasOwnProperty('description') || fields.description === "" || 
      !fields.hasOwnProperty('date') || fields.date === ""){
        return bad;
  } else if(!files.hasOwnProperty('logo') && (!fields.hasOwnProperty('logo') || fields.logo === "")){
    return bad;
  }

  return false;
}

/* GET events listing. */
router.get('/', function(req, res, next) {
  Event.find({}, function(error, events){
    res.json(events);
  });
});

router.post('/', function(req, res){

    //Formidable is used to parse the file upload sended by FormData
    var form = new formidable.IncomingForm();

    form.uploadDir = uploadDir;

    form.parse(req, function(err, fields, files) {
      var check = checkRequestContent(fields, files);
      if(check){
        res.statusCode = check.code;
        return res.json(check);
      }

      var date = moment(fields.date);

      var newEvent = new Event({
        title: fields.title,
        description: fields.description,
        date: date.format(dateFormat),
        logo: files.logo.path.replace("public", "")
      });

      newEvent.save(function(error, event){
        if(error || !event){
          res.statusCode = 500;
          return res.json({message:"Something bad happen in the Matrix, please warn the architect !", error:error});
        } else{
          res.json(event);
        }
      });
    });
});

router.put('/', function(req, res){
    //Formidable is used to parse the file upload sended by FormData
    var form = new formidable.IncomingForm();

    form.uploadDir = uploadDir;

    form.parse(req, function(err, fields, files) {
      var check = checkRequestContent(fields, files);
      if(check){
        res.statusCode = check.code;
        return res.json(check);
      }

      var date = fields.date;
      if(date.length !== dateSize){
        var date = moment(date).format(dateFormat);
      }

      var logo = fields.logo;
      if(files.hasOwnProperty("logo")){
        logo = files.logo.path.replace("public", "");
      }

      var newEvent = {
        title: fields.title,
        description: fields.description,
        date: date,
        logo: logo
      };

      Event.update({_id: fields._id}, {$set:newEvent}, function(error, event){
        if(error || !event){
          res.statusCode = 500;
          return res.json({message:"Something bad happen in the Matrix, please warn the architect !", error:error});
        } else{
          Event.findOne({_id: fields._id}, function(error, event){
            res.json(event);
          });
        }
      });
    });
      
});

module.exports = router;
