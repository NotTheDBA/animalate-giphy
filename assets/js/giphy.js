var gifTags = ["cat", "dog", "platypus", "unicorn", "The Rock"];

$(document).ready(function() {
    loadButtons(gifTags);

    $("button").on("click", function() {
        var gifTag = $(this).attr("gif-tag");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            gifTag + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function(response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div class='item'>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var giphyImage = $("<img>");
                    giphyImage.attr("src", results[i].images.fixed_height.url);

                    gifDiv.prepend(p);
                    gifDiv.prepend(giphyImage);

                    $("#gif-display").prepend(gifDiv);
                }
            });
    });
});


function makeButton(tag) {
    var b = $("<button>").attr("gif-tag", tag).text(tag);
    $("#buttons").append(b).append("\n");
}

function loadButtons(tagList) {
    tagList.forEach(element => {
        makeButton(element)
    });
}