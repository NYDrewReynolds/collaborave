jQuery(document).ready(function ($) {

    $("#search").keyup(function () {
        var searchData = $("#search").val();

        $('#sc-results').html('');

        SC.get('/tracks', {q: searchData, limit: '6'}, function (tracks) {

            for (var i = 0, len = tracks.length; i < len; i++) {
                $('#sc-results').append(
                    '<br><div>'
                    + "<a class='search-result' href='' data-url='"
                    + tracks[i].permalink_url
                    + "'>"
                    + tracks[i].title
                    + "</a>"
                    + "</div>"
                );
            }

            $('a.search-result').on('click', function () {
                var songParams = {
                    post: {
                        permalink_url: this.getAttribute("data-url"),
                        party_path: window.location.href
                    }
                };

                $.ajax({
                    type: 'POST',
                    url: '/api/v1/add_song',
                    data: songParams,
                    success: function (newSong) {
                        addNewSong(newSong.permalink_url);
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        console.log(xhr.status);
                        console.log(xhr.responseText);
                        console.log(thrownError);
                    }
                })
            });
        });

        return false;
    });

    function addNewSong(song_url) {
        ToneDen.player.getInstanceByDom("#player").addTracks([song_url]);
    }

});
