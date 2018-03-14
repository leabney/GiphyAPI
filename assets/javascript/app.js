$(document).ready(function(){
    $(".images").hide();
    renderButtons();
})

//emotion buttons//
//emotion array//
var emotions = ["happy", "sad", "bored", "tired", "surprised", "afraid", "mad", "excited", "frustrated", "mind blown"]


//add buttons via user input//
$("#addButton").on("click", function(add) {
    add.preventDefault();
    var newEmotion = $("#newEmotion").val();

    if (newEmotion !== ""){
    emotions.push(newEmotion);
    $("#newEmotion").val("");
    renderButtons();
    }

});


//create buttons//
function renderButtons(){
$(".buttons").empty();

for (var i = 0; i < emotions.length; i++) {
    var button = $("<button>");
    button.addClass("btn btn-emotion");
    button.attr("data-name", emotions[i]);
    button.text(emotions[i]);
    $(".buttons").append(button);
}
}

$(document).on('click', '.btn-emotion', function(){ 
    displayEmotion($(this).attr("data-name"));
});

function displayEmotion(emotion) {
    
    //build URL//
    $(".images").empty();
    $(".images").show();
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=PDzJlwrJZijAydXeheW9iarlbIj8Enuv&limit=10"

    //make call to giphy//
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        //handle response//
        .then(function (response) {
            console.log(response);
            var results = response.data
            

            for (var i = 0; i < results.length; i++) {
                var thumbnail = $("<div>");
                thumbnail.addClass("thumbnail");

                var image = $("<img>");
                image.addClass("img img-thumbnail float-left");
                image.attr("src", results[i].images.fixed_height_still.url);
                image.attr("data-still",results[i].images.fixed_height_still.url)
                image.attr("data-animate",results[i].images.fixed_height.url);
                image.attr("data-state","still");
                image.attr("alt", results[i].title);
                image.attr("type","image");
                
                var caption = $("<div>");
                caption.addClass("caption");
                var p = $("<p>");
                
                
                var rating = results[i].rating.toUpperCase();
                p.text("Rating: " + rating);

                caption.append(p);
                thumbnail.append(image);
                thumbnail.append(caption);

                $(".col-sm-12").prepend(thumbnail);
            };
        })
}
//animation//

$('body').on('click','img',function(){



    var state = $(this).attr("data-state")
 
    if (state==="still"){
        $(this).attr("src",$(this).attr("data-animate"));
        $(this).attr("data-state","animate");
      }
      else if(state="animate"){
        $(this).attr("src",$(this).attr("data-still"));
        $(this).attr("data-state","still");
      }
})