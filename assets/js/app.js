	// Some initial gifs
	var gifs = ['stick figure', 'bird', 'hummingbird', 'penguin'];

	// ========================================================

	// Generic function for dumping the JSON content for each button into the div
	function displayGifInfo(){
		
		var gif = $(this).attr('data-name');
		var queryURL = "https://api.giphy.com/v1/gifs/search?q="+gif+"&api_key=dc6zaTOxFJmzC&limit=5&rating=g"
		//Write code between the dashes below to hit the queryURL, take the data and display it in the div with an id of moviesView
		
		//------YOUR CODE GOES IN THESE DASHES
		$("#gifView").html('');
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
			var str;
			for (var i = 0; i < gifs.length; i++){
			 str = '<img src="'+response.data[i].images.fixed_height_still.url+'" data-still="'+response.data[i].images.fixed_height_still.url+'" data-animate="'+response.data[i].images.fixed_height.url+ '" data-state="still" class="giphy"><br><br>';

	     	 $("#gifView").append(str);
	     	}
		}); 
		//------
	}

	// ========================================================
	function displayGiphy(){
		var state = $(this).attr('data-state');

		if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
	};
	// Generic function for displaying movie data 
	function renderButtons(){ 

		// Deletes the movies prior to adding new movies (this is necessary otherwise you will have repeat buttons)
		$('#buttonsView').empty();

		// Loops through the array of movies
		for (var i = 0; i < gifs.length; i++){

			// Then dynamicaly generates buttons for each movie in the array

			// Note the jQUery syntax here... 
		    var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
		    a.addClass('gif'); // Added a class 
		    a.addClass('btn')
		    a.attr('data-name', gifs[i]); // Added a data-attribute
		    a.text(gifs[i]); // Provided the initial button text
		    $('#buttonsView').append(a); // Added the button to the HTML
		}
	}

	// ========================================================

	// This function handles events where one button is clicked
	$('#addGif').on('click', function(){

		// This line of code will grab the input from the textbox
		var gif = $('#gif-input').val().trim();

		// The movie from the textbox is then added to our array
		gifs.push(gif);
		
		 
		renderButtons();

		// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
		return false;
	})

	// ========================================================

	// Generic function for displaying the gif
	$(document).on('click', '.gif',displayGifInfo);
	$(document).on('click', '.giphy',displayGiphy);

		//------

	// ========================================================

	// This calls the renderButtons() function
	renderButtons();

