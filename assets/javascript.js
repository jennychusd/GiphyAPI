var game = {
	topics: ["luke skywalker", "darth vader", "obiwan kanobi", "r2d2"],

	renderButtons: function() {
		console.log("renderButtons function called");
		$(".buttonRow").empty();
		// loop through topics array
        for (var i = 0; i < game.topics.length; i++) {
			// create button tags for each element in topics array
			var a = $("<button class='swPerson'>");
			// add data-person attribute
			a.attr("data-person", game.topics[i]);
			// add text on button
			a.text(game.topics[i]);
			// add button to html element to display
			$(".buttonRow").append(a);
        }
	},

	displayGif: function() {
		console.log("displayGif function called");
		// clear existing gifs
		$("#gifsHolder").empty();
		var person = $(this).attr("data-person");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=dc6zaTOxFJmzC&limit=10&rating=g";

        // create ajax call for button clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
			var results = response.data;
			// for each of the gifs
			for (var i = 0; i < results.length; i++) {
				console.log("Results: " + results);
				// create div to store gif and rating
				var gifDiv = $("<div class='gifDiv'>");
				// store rating of gif
				var rating = results[i].rating;
				// store and create p tag for rating
				var p = $("<p>").text("Rating: " + rating);
				// create image tag with some attributes
				var gifImage = $("<img data-state='still' class='gifImage'>");
				// store still and animated image urls in image attributes
				// display still image as default
				gifImage.attr("data-still", results[i].images.fixed_height_still.url);
				gifImage.attr("data-animate", results[i].images.fixed_height.url);
				gifImage.attr("src", results[i].images.fixed_height_still.url);
				// add p and gifImage to div
				gifDiv.append(p);
				gifDiv.append(gifImage);
				// add div to html element to display
				$("#gifsHolder").append(gifDiv);
			}
        });
  	},

  	changeLink: function() {
  		var state = $(this).attr("data-state");
  		if (state === "still") {
  			// change src and state to animate variation
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
			} else {
			// change src and state to still variation
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}
  	},

  	addPerson: function() {
  		console.log("addPerson function called");
		// This line grabs the input from the textbox
		var newPerson = $("#character-input").val().trim();

		// Adding movie from the textbox to our array
		game.topics.push(game.newPerson);

		// Calling renderButtons which handles the processing of our movie array
		console.log("calling renderButtons function")
		game.renderButtons();
  	},
};

game.renderButtons();
$(document).on("click", "#add-person", game.addPerson);
$(document).on("click", ".swPerson", game.displayGif);
$(document).on("click", ".gifImage", game.changeLink);