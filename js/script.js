// Javascript Code.

// Part of structure that will be added to html
var song_box_image = "<div class='row song_box'><div class='col-md-4 image_box'>"; //</div>
var song_box_info = "</div><div class='col-md-8 description_box'>"; //</div></div>
var image_tag = "<img src='";
var description_box = "<div class='col-md-8 description_box'></div>";
var no_image = "images/music.png";

// Describe how the song list is sorted.
var _1_to_50 = "<h3 class='text-center sort_info'><small> 1 - 50 </small></h3>";
var _50_to_1 = "<h3 class='text-center sort_info'><small> 50 - 1 </small></h3>";
var alpha_a_z = "<h3 class='text-center sort_info'><small> A - Z </small></h3>";
var alpha_z_a = "<h3 class='text-center sort_info'><small> Z - A </small></h3>";
var size_large = "<h3 class='text-center sort_info'><small> Largest </small></h3>";
var size_small = "<h3 class='text-center sort_info'><small> Smallest </small></h3>";

//Sort the array from the most listened song.
var sorting_play_most = function(object1, object2, key) {
    return object2.playcount - object1.playcount;
};

//Sort the array from the least played song.
var sorting_play_less = function(object1, object2) {
    return object1.playcount - object2.playcount;
};

//sorts the list in alphabetical order from 'A'
var sorting_alpha_az = function(object1, object2) {
    return ((object1["name"] == object2["name"]) ? 0 : ((object1["name"] > object2["name"]) ? 1 : -1 ));
};

//sorts the list in alphabetical order from 'Z'
var sorting_alpha_za = function(object1, object2) {
    return ((object2["name"] == object1["name"]) ? 0 : ((object2["name"] > object1["name"]) ? 1 : -1 ));
};

//sorts the list by the video length, from largest to smallest.
var sorting_large = function(object1, object2) {
    return object2.duration - object1.duration;
};

//sorts the list by the video length, from smallest to largest.
var sorting_small = function(object1, object2) {
    return object1.duration - object2.duration;
};

//removes the div where the information of the songs are.
var del_songs = function() {
    $(".sort_info").remove();
    $(".song_box").remove();
}

//adds the song information on the structure of html.
var append_songs = function(array) {
    for (i = 0; i < array.length; i++) {
        if (array[i]["image"]) {
            $(".body_page").append(song_box_image + image_tag + array[i]["image"][3]["#text"] +
                "' class='img-thumbnail'>" + song_box_info  + "<p class='track_position'><b> Position: </b>" +
                array[i]["position"] + "</p><p class='song_info'> <b>Track: </b>" + array[i]["name"] +
                "</p> <p class='song_info'><b>Artist: </b>"+array[i]["artist"]["name"] + "</p>" +
                "<p class='song_info'> <b>Playcount: </b>"+ array[i]["playcount"] +
                "</p><p class='song_info'><b>Duration: </b>"+ array[i]["minutes"] + " min.</p></div></div>");
        } else {
            $(".body_page").append(song_box_image + image_tag + no_image +"' class='img-thumbnail'>" +
                song_box_info  + "<p class='track_position'><b> Position: </b>" + array[i]["position"] +
                "</p><p class='song_info'> <b>Track: </b>" + array[i]["name"] +
                "</p> <p class='song_info'><b>Artist: </b>"+array[i]["artist"]["name"] + "</p>" +
                "<p class='song_info'> <b>Playcount: </b>"+ array[i]["playcount"] +
                "</p><p class='song_info'><b>Duration: </b>"+ array[i]["minutes"] + " min.</p></div></div>");
        };
    };
};

//converts seconds to minutes.
var convert_min = function(time) {
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;
    minutes = minutes < 10 ? '0' + minutes : minutes; //puts a 0 to minutes if less than 10
    seconds = seconds < 10 ? '0' + seconds : seconds; //puts a 0 to seconds if less than 10
    var result = minutes + ":" + seconds; //colon quotes assure us the conversion to string of the result.
    return result;
};

jQuery(document).ready(function($) {
    var trak_list;
    var time;

    $(".nav").hide();

    //Scroll up when you click on the span.go_top
    $('.go_top').click(function(){
        $('body, html').animate({
            scrollTop: '0px'
        }, 300);
    });

    //does appear the div when scroll down.
    $(window).scroll(function(){
        if( $(this).scrollTop() > 0 ){
            $('.go_top').slideDown(200);
        } else {
            $('.go_top').slideUp(200);
        }
    });

    $.ajax({
        url: "http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=5d68545d24d173b2af0548c816dd1c0a&format=json",
        dataType: "jsonp",
        success : function(parsed_json) {
            trak_list = parsed_json["tracks"]["track"]; //"cut" json structure to contain only an array, and by easier access to information.

            trak_list.sort(sorting_play_most);

            /*Information of the position of the song, and the time converted to minutes is added.*/
            for (var i = 0; i < trak_list.length; i++) {
                trak_list[i].position = (i + 1).toString();
                time = trak_list[i].duration;
                trak_list[i].minutes = convert_min(time);
            };

            append_songs(trak_list);
        }
    });

    $(".sort_by").click(function() {
        $(".nav").slideToggle();
    });

    $("#most_played").click(function(){
        del_songs();
        $(".top_tracks_heading").after(_1_to_50);
        trak_list.sort(sorting_play_most);
        append_songs(trak_list);
        $(".body_page").effect('slide');
    });

    $("#less_played").click(function() {
        del_songs();
        $(".top_tracks_heading").after(_50_to_1);
        trak_list.sort(sorting_play_less);
        append_songs(trak_list);
        $(".body_page").effect('slide');
    });

    $("#a_z").click(function() {
        del_songs();
        $(".top_tracks_heading").after(alpha_a_z);
        trak_list.sort(sorting_alpha_az);
        append_songs(trak_list);
        $(".body_page").effect('slide');
    });

    $("#z_a").click(function() {
        del_songs();
        $(".top_tracks_heading").after(alpha_z_a);
        trak_list.sort(sorting_alpha_za);
        append_songs(trak_list);
        $(".body_page").effect('slide');
    });

    $("#large").click(function() {
        del_songs();
        $(".top_tracks_heading").after(size_large);
        trak_list.sort(sorting_large);
        append_songs(trak_list);
        $(".body_page").effect('slide');
    });

    $("#small").click(function() {
        del_songs();
        $(".top_tracks_heading").after(size_small);
        trak_list.sort(sorting_small);
        append_songs(trak_list);
        $(".body_page").effect('slide');
    });
});
