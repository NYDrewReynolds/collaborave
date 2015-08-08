jQuery(document).ready(function ($) {

    $("#search").keyup(function () {
        var searchData = $("#search").val();

        $('#sc-results').html('');

        SC.get('/tracks', {q: searchData, limit: '20'}, function (tracks) {

            for (var i = 0, len = tracks.length; i < len; i++) {
                $('#sc-results').append(
                    '<br><div>'
                    + '<a id="search-result" href="#" permalink_url="'
                    + tracks[i].permalink_url
                    + '">'
                    + tracks[i].title
                    + '</a>'
                    + '</div>'
                );

                var track_url = tracks[i].permalink_url;
                var player = SC.oEmbed(track_url, {auto_play: true});

                $('#sc-results').html(player);
            }
        });

        return false;
    });

});
