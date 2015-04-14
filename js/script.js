// Javascript Code.

var list_artist = [];
/*var song_box = "<div class='row song_box'><div class='col-md-4 image_box'></div><div class='col-md-8 description_box'></div></div>";*/
var song_box_image = "<div class='row song_box'><div class='col-md-4 image_box'>"; //</div>
var song_box_info = "</div><div class='col-md-8 description_box'>"; //</div></div>
var image_tag = "<img src='";
var description_box = "<div class='col-md-8 description_box'></div>";
var no_image = "images/music.png";

var sorting_play_most = function(object1, object2) {
    return object2.playcount - object1.playcount;
};

var sorting_play_less = function(object1, object2) {
    return object1.playcount - object2.playcount;
};

var sorting_alpha = function(object1, object2) {
    return ((object1["name"] == object2["name"]) ? 0 : ((object1["name"] > object2["name"]) ? 1 : -1 ));
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

var del_songs = function() {
    $(".song_box").remove();
}

var append_songs = function(array) {
    var count = 1;
    var track_position;
    for (i = 0; i < array.length; i++) {
        track_position = count + i;
        if (array[i]["image"]) {
            $(".body_page").append(song_box_image + image_tag + array[i]["image"][3]["#text"] +"' class='img-thumbnail'>" + song_box_info  + "<p class='track_position'><b> Position: </b>" + track_position.toString() + "</p><p class='song_name'> <b>Track: </b>" + array[i]["name"] + "</p> <p class='artist_name'><b>Artist: </b>"+array[i]["artist"]["name"] + "</p>" + "<p class='playcount'> <b>Playcount: </b>"+ array[i]["playcount"] + "</p><p class='duration'><b>Duration: </b>"+ array[i]["duration"] + "</p></div></div>");
        } else {
            $(".body_page").append(song_box_image + image_tag + no_image +"' class='img-thumbnail'>" + song_box_info  + "<p class='track_position'><b> Position: </b>" + track_position.toString() + "</p><p class='song_name'> <b>Track: </b>" + array[i]["name"] + "</p> <p class='artist_name'><b>Artist: </b>"+array[i]["artist"]["name"] + "</p>" + "<p class='playcount'> <b>Playcount: </b>"+ array[i]["playcount"] + "</p><p class='duration'><b>Duration: </b>"+ array[i]["duration"] + "</p></div></div>");
        };
    };
};


var ajax_response = function(sort_by) {
    $.ajax({
        url: "http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=5d68545d24d173b2af0548c816dd1c0a&format=json",
        dataType: "jsonp",
        success : function(parsed_json) {
            var trak_list = parsed_json["tracks"]["track"];
            trak_list.sort(sort_by);
            console.log(trak_list);
            append_songs(trak_list);
            console.log(trak_list[0]["image"][2]);
        }
    });
};

jQuery(document).ready(function($) {
    ajax_response(sorting_play_most);

    $("#most_played").click(function(){
        del_songs();
        ajax_response(sorting_play_most );
    });

    $("#less_played").click(function() {
        del_songs();
        ajax_response(sorting_play_less);
    });
});

