require 'rails_helper'

RSpec.describe User, :type => :request do

  before(:each) do
    @user = User.create(name: "Drew Reynolds")
    @party = @user.parties.create(name: "End of M3 Party")
    @song = Song.create(url: "https://soundcloud.com/flume/disclosure-you-me-flume-remix")
    @party.party_songs.create(song: @song)
  end

  it "has a 200 status code" do
    expect(@party.party_songs[-1].song_id).to eq(@song.id)
    song_count = PartySong.all.count
    params = {song: {
        song_index: "0",
        party_path: "http://localhost:3000/parties/end-of-m3-party"
    }
    }

    delete '/api/v1/remove_song', params.to_json, {'CONTENT_TYPE' => 'application/json', 'ACCEPT' => 'application/json'}

    expect(response.status).to eq(200)
    expect(PartySong.all.count).to eq(song_count-1)
    expect(JSON.parse(response.body)['success']).to eq(true)
  end

end
