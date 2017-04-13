var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

// Requiring models
var Note = require("./models/Note.js");
var Story = require("./models/Story.js");

// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

var app = express();
var port = process.env.PORT || 8080;


app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Database configuration with mongoose
mongoose.connect("mongodb://heroku_3g888fzh:5ui81vhbuai5umnscnv1dulk7l@ds153710.mlab.com:53710/heroku_3g888fzh");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

//Routes

app.get("/", function(req, res) {

      var query = Story.find({}).limit(10);

      query.exec(function(err, docs){

          if(err){
            throw error;
          }

          res.render("index",{story: docs});
      });
    });

//Scraping Articles from Cracked
app.get("/scrape", function(req, res) {

  request("http://www.cracked.com/funny-articles.html", function(error, response, html) {

    var $ = cheerio.load(html);

    $("div.listEntry").each(function(i, element) {

          var result = {};

          result.title = $(this).find("div.meta").find("h3").find("a").text();
          result.link =  $(this).find("a").attr("href");
          result.image = $(this).find("a").find("img").attr("data-img");
          result.saved = false;

          console.log(result);

          var entry = new Story(result);

          entry.save(function(err, doc) {

            if (err) {
              console.log(err);
            }
            else {
              console.log(doc);
            }
      });
      // closing entry.save

    });
    //closing div.listEntry


    });
    // closing request

    res.send("Scrape Complete");

  });
  // closing app.get

//Get Articles from DB
app.get("/stories", function(req, res) {
  // Grab every doc in the Articles array
  Story.find({}, function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});

// Grab an article by it's ObjectId
app.get("/stories/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  Story.findOne({ "_id": req.params.id })
  // ..and populate all of the notes associated with it
  .populate("note")
  // now, execute our query
  .exec(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise, send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});


app.get("/saved", function(req,res){

  Story.where({ _id: req.body.id }).update({ $set:{saved: true }})

      .exec(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise, send the doc to the browser as a json object
    else {
      res.render("saved",{story: doc});
    }
  });
});



app.listen(port, function() {
  console.log("App running on port " + port);
});
