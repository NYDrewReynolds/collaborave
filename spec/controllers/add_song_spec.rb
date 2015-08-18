require 'rails_helper'

RSpec.describe User, :type => :request do

  before(:each) do
    @user = User.create(name: "Drew Reynolds")
    @party = @user.parties.create(name: "End of M3 Party")
  end

  it "has a 200 status code" do
    song_count = Song.all.count
    params = {song: {
        permalink_url: "https://soundcloud.com/flume/disclosure-you-me-flume-remix",
        party_path: "http://localhost:3000/parties/end-of-m3-party"
    }
    }

    post '/api/v1/add_song', params.to_json, {'CONTENT_TYPE' => 'application/json', 'ACCEPT' => 'application/json'}

    expect(response.status).to eq(200)
    expect(Song.all.count).to eq(song_count+1)
    expect(JSON.parse(response.body)['success']).to eq(true)
  end

end
