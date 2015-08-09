class Api::V1::SearchController < ApplicationController

  def add_song
    song_url = params[:post][:permalink_url]
    party_id = params[:post][:party_id]
    song = Song.create(url: song_url)
    party = Party.find_by(id: party_id)
    party.party_songs.create(song: song)
    render party_path(party)
  end

end
