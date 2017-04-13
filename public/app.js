// Scrape articles from DB

$("#scrapeArticles").on("click", function(){


});


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
    url: "/stories/" + thisId,
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
