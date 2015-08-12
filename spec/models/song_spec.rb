require "rails_helper"

RSpec.describe User, :type => :model do
  it "song can be created" do
    song = Song.create(url: "https://soundcloud.com/flume/disclosure-you-me-flume-remix")

    expect(Song.last.url).to eq(song.url)
  end

end
