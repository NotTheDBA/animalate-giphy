var gifTags = ["cat", "dog", "platypus", "unicorn", "The Rock"];

$(document).ready(function() {
    loadButtons(gifTags);

    //  On Click event associated with the add-to-do function
    $("#add-to-tags").on("click", function(event) {
        event.preventDefault();

        addButtonTag($("#add-tag").val().trim());
        // // Clear the textbox when done
        $("#add-tag").val("");
    });

});

function addButtonTag(tag) {
    if (tag.length > 0) {
        gifTags.push(tag);
        loadButtons(gifTags);
    };
}

function makeButton(tag) {
    var b = $("<button>").attr("gif-tag", tag).addClass("tag-btn").text(tag);
    $("#buttons").append(b).append("\n");
}

function loadButtons(tagList) {
    $("#buttons").empty();
    tagList.forEach(element => {
        makeButton(element)
    });
    addTagButtonClicks();
}

function addTagButtonClicks() {
    $(".tag-btn").on("click", function() {
        var gifTag = $(this).attr("gif-tag");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            gifTag + "&api_key=Lag4SW0Rvz64rsiP0rAttQGD3C3zzl4U&limit=10";

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function(response) {
                loadGifs(response.data);
            });
    });

    function addAnimationClick(clickableImage) {

        $(clickableImage).on("click", function() {
            var newState = (($(this).attr("image-state") === "static") ? "giphy" : "static")
            $(this).attr("src", $(this).attr(newState));
            $(this).attr("image-state", newState);

        });
    }

    function loadGifs(results) {
        for (var i = 0; i < results.length; i++) {

            var giphyImage = $("<img>").addClass("gif-able").attr("image-state", "static");
            giphyImage.attr("src", results[i].images.fixed_height_still.url);
            giphyImage.attr("giphy", results[i].images.fixed_height.url);
            giphyImage.attr("static", results[i].images.fixed_height_still.url);
            addAnimationClick(giphyImage);

            var gifDiv = $("<div class='item'>");
            gifDiv.append($("<p>").text("Rating: " + results[i].rating));
            gifDiv.append(giphyImage);

            $("#gif-display").prepend(gifDiv);
        }
    }
}