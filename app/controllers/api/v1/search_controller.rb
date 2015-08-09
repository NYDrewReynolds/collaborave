class Api::V1::SearchController < ApplicationController

  def add_song
    song_url = params[:post][:permalink_url]
    party_id = params[:post][:party_id]
    song = Song.create(url: song_url) if Song.find_by(url: song_url).nil?
    party = Party.find_by(id: party_id)
    party.party_songs.create(song: song)
    flash[:success] = 'Song successfully added!'
    render party_path(party)

    respond_to do |format|
      format.js
    end

  end

end
