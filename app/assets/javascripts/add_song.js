$(document).ready(function () {

    $('#search-result').on('click', function () {
        var songParams = {
            post: {permalink_url: $('#permalink_url')}
        };

        $.ajax({
            type: 'POST',
            url: '/api/v1/add_song',
            data: songParams,
            success: function (newSong) {
                $('#latest-posts').append(


                    "<div class='post' data-id='"
                    + newSong.id
                    + "'><h6>Published on "
                    + newSong.created_at
                    + "</h6>"
                    + "<p>"
                    + newSong.description
                    + "</p>"
                    + "<button id='delete-post' name='delete-button' class='btn btn-default btn-xs'>Delete</button>"
                    + "</div>"
                )
            }
        })
    });
