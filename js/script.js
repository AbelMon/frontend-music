// Javascript Code.

var list_artist = [];
/*var song_box = "<div class='row song_box'><div class='col-md-4 image_box'></div><div class='col-md-8 description_box'></div></div>";*/
var song_box_image = "<div class='row song_box'><div class='col-md-4 image_box'>"; //</div>
var song_box_info = "</div><div class='col-md-8 description_box'>"; //</div></div>
var image_tag = "<img src='";
var description_box = "<div class='col-md-8 description_box'></div>";

var sorting = function(object1, object2) {
    return object2.playcount - object1.playcount;
};

/*
var append_songs = function(array) {
    var count = 1;
    var position;
    for (i = 0; i < array.length; i++) {
        position = count + i;
        $(".body_page").append("<p>"+ position.toString()+ array[i]["artist"]["name"]+ array[i]["name"] +"</p>");
    };
};
*/

var append_songs = function(array) {
    var count = 1;
    var track_position;
    for (i = 0; i < array.length; i++) {
        track_position = count + i;
        if (array[i]["image"]) {
            $(".body_page").append(song_box_image + image_tag + array[i]["image"][3]["#text"] +"' class='img-thumbnail'>" + song_box_info  + "<p class='track_position'><b> Position: </b>" + track_position.toString() + "</p><p class='song_name'> <b>Track: </b>" + array[i]["name"] + "</p> <p class='artist_name'><b>Artist: </b>"+array[i]["artist"]["name"] + "</p>" + "<p class='playcount'> <b>Playcount: </b>"+ array[i]["playcount"] + "</p></div></div>");
        }
    };
};


jQuery(document).ready(function($) {
    $.ajax({
        url: "http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=5d68545d24d173b2af0548c816dd1c0a&format=json",
        dataType: "jsonp",
        success : function(parsed_json) {
            var trak_list = parsed_json["tracks"]["track"];
            trak_list.sort(sorting);
            console.log(trak_list);
            append_songs(trak_list);
            console.log(trak_list[0]["image"][2]);
        }
    });
});
