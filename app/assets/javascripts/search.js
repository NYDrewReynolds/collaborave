jQuery(document).ready(function ($) {

    $("#search").keyup(function () {
        var searchData = $("#search").val();

        $('#sc-results').html('');

        SC.get('/tracks', {q: searchData, limit: '20'}, function (tracks) {

            for (var i = 0, len = tracks.length; i < len; i++) {
                $('#sc-results').append(
                    '<br><div>'
                    + "<a class='search-result' href='#' data-url='"
                        //+ "<a class='search-result' href='"
                    + tracks[i].permalink_url
                    + "'>"
                    + tracks[i].title
                    + "</a>"
                    + "</div>"
                );
            }

            $('a.search-result').on('click', function () {
                var songParams = {
                    post: {permalink_url: this.getAttribute("data-url"),
                           party_id: this.pathname[this.pathname.length - 1]}
                };

                $.ajax({
                    type: 'POST',
                    url: '/api/v1/add_song',
                    data: songParams,
                    success: function (newSong) {
                        $('#latest-posts').append(
                            "<div class='sc-track' plangular='"
                            + newSong.url
                            + "'><div class='pull-left'<img ng-src='{{track.artwork_url}}'></div> <h3>{{track.user.username}} - {{track.title}}</h3> <button ng-click='playPause()'>Play/Pause</button><progress ng-click='seek($event)' ng-value='currentTime / duration' > {{ currentTime / duration }} </progress> <br> <a ng-href='"
                            + newSong.url
                            + "'> View on SoundCloud </a>"
                            + "</div>"
                        )
                    }
                })
            });
        });

        return false;
    });

});
