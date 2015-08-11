class Api::V1::SearchController < ApplicationController
  require 'uri'

  def add_song
    song_url = params[:post][:permalink_url]
    party_path = params[:post][:party_path]
    uri = URI(party_path)
    party_slug = uri.path.split("/")[-1]
    # song = Song.create(url: song_url)
    song = Song.create(url: song_url) if Song.find_by(url: song_url).nil?
    party = Party.friendly.find(party_slug)
    party.party_songs.create(song: song)

    respond_to do |format|
      format.js { render json: {success: true} }
    end

  end

  def remove_song
    song_index = params[:song][:song_index].to_i
    party_path = params[:song][:party_path]
    uri = URI(party_path)
    party_slug = uri.path.split("/")[-1]
    party = Party.friendly.find(party_slug)

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
