class Api::V1::SearchController < ApplicationController

  def add_song
    song_url = params[:post][:permalink_url]
    party_id = params[:post][:party_id]
    # song = Song.create(url: song_url)
    song = Song.create(url: song_url) if Song.find_by(url: song_url).nil?
    party = Party.find_by(id: party_id)
    party.party_songs.create(song: song)

    respond_to do |format|
      format.js { render json: {success: true} }
    end

  end

  def remove_song
    song_index = params[:song][:song_index].to_i
    party_id = params[:song][:party_id]
    party = Party.find_by(id: party_id)
    songs_group = []

    party.songs.each do |song|
      songs_group << song
    end

    song_to_remove = songs_group[song_index]
    party.party_songs.find_by(song_id: song_to_remove.id).destroy

    respond_to do |format|
      format.js { render json: {success: true} }
    end
  end

end
