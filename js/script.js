// Javascript Code.

var list_artist = [];

var sorting = function(object1, object2) {
    return object2.playcount - object1.playcount;
};

var append_songs = function(array) {
    for (i = 0; i < array.length; i++) {
        $(".body_page").append("<p>"+ array[i]["artist"]["name"]+ array[i]["name"] +"</p>");
    };
};

jQuery(document).ready(function($) {
    $.ajax({
        url: "http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=5d68545d24d173b2af0548c816dd1c0a&format=json",
        dataType: "jsonp",
        success : function(parsed_json) {
            var trak_list = parsed_json["tracks"]["track"];
            trak_list.sort(sorting);
            console.log(trak_list[0]);
            append_songs(trak_list);
            console.log(trak_list);
        }
    });
});