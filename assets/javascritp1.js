var game = {
	topics: ["luke skywalker", "darth vader", "obiwan kanobi", "r2d2"],

	// display buttons based on topics array
	renderButton: function() {
		// clear all buttons
		$(".buttonRow").empty();
		// loop through topics array to create buttons
		// add data-search and text to all buttons with proper names
		for (var i=0; i < this.topics.length; i++) {
			// create button tag
			var a = $("<button>");
			// add attribute with data set to button
			a.attr("data-search", this.topics[i]);
			console.log(a);
			// set button text
			a.text(this.topics[i]);
			// add button to html element
			$(".buttonRow").append(a);
		}
	}
}

$("button").on("click", function() {
	// clear content of gifsHolder
	$("#gifsHolder").empty();
	// get search term from html button
	var searchTerm = $(this).attr("data-search");
	// prep search term for URL injection
	searchTerm = encodeURI(searchTerm);
	// concatenate search term into query url
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
	searchTerm + "&api_key=dc6zaTOxFJmzC&limit=10&rating=g";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {

		var results = response.data;
		console.log(results);
		for (var i = 0; i < results.length; i++) {
			// create new div to hold new gif
	        var gifDiv = $("<div>");
	        // create p tag with giphy rating
	        var p = $("<p>").html("Rating: " + results.rating);;
	        // create img tag with giphy image source
	        var gifImage = $("<img>").attr("src", results.images.fixed_height.url);;
	        // append rating p tag to gif div
	        gifDiv.append(p);
	        // append image to gif div
	        gifDiv.append(gifImage);
	        // append gif div to html div
	        $("#gifsHolder").append(gifDiv);
	    };
	});
});

$("#add-character").on("click", function(event) {
	// event.preventDefault();
	// get input from form
	var swCharacter = $("#character-input").val().trim();
	// add to array
	topics.push(swCharacter);
	// display buttons on screen
	game.renderButtons();
});

game.renderButton();