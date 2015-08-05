jQuery(document).ready(function ($) {

    $("#search").keyup(function () {
        // get the search form value
        var formData = $("#search").val();

        // clear search results div
        $('#sc-results').html('');

        // find all tracks with the genre 'punk' that have a tempo greater than 120 bpm.
        SC.get('/tracks', {q: formData, duration: {from: 3000000}, limit: '40'}, function (tracks) {

            for (var i = 0, len = tracks.length; i < len; i++) {
                $('#sc-results').append('<div>' + '<a href="' + tracks[i].permalink_url + '">' + tracks[i].title + '</a>' + '</div><br>');

                var track_url = tracks[i].permalink_url;
                var player = SC.oEmbed(track_url, {auto_play: true});

                $('#sc-results').html(player);
            }
        });

        return false;
    });

});
