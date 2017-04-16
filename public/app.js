
//Save article

//When article is saved, the article selected is updated in the DB from "saved: false" to "saved: true"

$(document).on("click", ".saveArticle", function() {


      var status = $(this).attr("data-status");

      $(this).attr("data-status", true);

      console.log(status);

      var thisId = $(this).attr("data-id");
      console.log(thisId);

        // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/updates/" + thisId,
    data: {
      // Value taken from title input
      saved: true
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
    });


});


// On-click, change saved from true to false and repopulate on home page
$(document).on("click", ".removeFavorite", function(e) {


  var thisStatus = $(this).attr("data-status");
  var thisId = $(this).attr("data-id");
  console.log(thisId);
        // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/updates/" + thisId + "/" + thisStatus,
    data: {
      // Value taken from title input
      saved: false
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
    });


});



$(document).on("click", ".saveNotes", function(e) {

   var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/notes/" + thisId,
    data: {
      // Value taken from title input
      body: $("#newNotes").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
    });


  });

//On-click save notes to database
$(document).on("click", ".takeNotes", function(e) {

  var thisId = $(this).attr("data-id");
  var showSection = "#" + thisId;

  $(showSection).show();

    $.ajax({
    method: "GET",
    url: "/notes/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
      console.log(data);
      // // The title of the article
      $(showSection).append("<h4 style='margin-top: 30px'>" + "Saved Notes" + "</h4>");
      $(showSection).append("<p>" + data.note.body + "</p>");
      // An input to enter a new title
      // $(showSection).append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      // $(showSection).append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $(showSection).append("<button data-id='" + data._id + "' id='savenote'>Clear Note</button>");

  });
  });

