var express = require("express");

var router = express.Router();

module.exports = function(app) {
    app.get("/stories", function(req, res) {

      var query = Story.find({});

      query.exec(function(err, docs){

          if(err){
            throw error;
          }

          res.render("index",{story: docs});


      });

    });

  }
