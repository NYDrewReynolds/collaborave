class Api::V1::SearchController < ApplicationController

  def add_song
    song_url = params[:permalink_url]
    song = Song.create(url: song_url)
    party = Party.find_by(id: params[:id])
    party.party_songs.create(song: song)
  end

end
