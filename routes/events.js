var express = require('express');
var router = express.Router();
var moment = require('moment');
var formidable = require('formidable');
var Event = require("../models/Event.js").Event;

var uploadDir = "public/images",
    dateFormat = "YYYY/MM/DD",
    dateSize = dateFormat.length;

/*
* This function check if all informations for adding or modifying an event are provided
*/
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

function getToday(){
  return moment().format(dateFormat);
}

/*
* REQUEST HANDLER
*/
router.get('/', function(req, res, next) {
  var today = getToday();
  Event.find({}).lean().exec(function(error, events){ //use lean.exec to have an array of plain JS object, useful for on the fly "past" modification
    events.forEach(function(mEvent){
      if(mEvent.date < today){
        mEvent.past = true;
      } else {
        mEvent.past = false;
      }
    });
    res.json(events);
  });
});

router.post('/', function(req, res){

    //Formidable is used to parse the file upload sended by FormData
    var form = new formidable.IncomingForm();

    form.uploadDir = uploadDir;

    form.parse(req, function(err, fields, files) { //formidable parse the request and store informations in fields and files
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
        logo: files.logo.path.replace("public", "") //removing the "public" part of the image path because this part is "invisible" for the front
      });

      newEvent.save(function(error, event){
        event = event.toObject(); //Convert event on plain JS object, useful for "past" modification
        if(error || !event){
          res.statusCode = 500;
          return res.json({message:"Something bad happen in the Matrix, please warn the architect !", error:error});
        } else{
          if(event.date < getToday()){
            event.past = true;
          } else {
            event.past = false;
          }
          res.json(event);
        }
      });
    });
});

router.put('/', function(req, res){
    //Formidable is used to parse the file upload sended by FormData
    var form = new formidable.IncomingForm();

    form.uploadDir = uploadDir;

    form.parse(req, function(err, fields, files) { //formidable parse the request and store informations in fields and files
      var check = checkRequestContent(fields, files);
      if(check){
        res.statusCode = check.code;
        return res.json(check);
      }

      var date = fields.date;
      if(date.length !== dateSize){
        var date = moment(date).format(dateFormat);
      }

      //Check if the logo is a new file or if the old logo is remaining
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

      Event.update({_id: fields._id}, {$set:newEvent}, function(error, bddModification){
        if(error || !bddModification.ok){
          res.statusCode = 500;
          return res.json({message:"Something bad happen in the Matrix, please warn the architect !", error:error});
        } else{
          Event.findOne({_id: fields._id}, function(error, event){
            event = event.toObject(); //Convert event on plain JS object, useful for "past" modification
            if(event.date < getToday()){
              event.past = true;
            } else {
              event.past = false;
            }
            res.json(event);
          });
        }
      });
    });
});

module.exports = router;
