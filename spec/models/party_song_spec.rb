require "rails_helper"

RSpec.describe User, :type => :model do
  it "song can be associated with a party" do
    party = Party.create(name: "End of M3 Party")
    song = Song.create(url: "https://soundcloud.com/flume/disclosure-you-me-flume-remix")

    party.party_songs.create(song_id: song.id)
    expect(PartySong.last.party_id).to eq(party.id)
    expect(PartySong.last.song_id).to eq(song.id)
  end

end
