jQuery(document).ready(function ($) {

    $("#search").keyup(function () {
        // get the search form value
        var searchData = $("#search").val();

        // clear search results div
        $('#sc-results').html('');

        SC.get('/tracks', {q: searchData, limit: '20'}, function (tracks) {

            for (var i = 0, len = tracks.length; i < len; i++) {
                $('#sc-results').append(
                    '<div>'
                    + '<a href="'
                    + tracks[i].permalink_url
                    + '">'
                    + tracks[i].title
                    + '</a>'
                    + '</div><br>'
                );

                var track_url = tracks[i].permalink_url;
                var player = SC.oEmbed(track_url, {auto_play: true});

                $('#sc-results').html(player);
            }
        });

        return false;
    });

});
