require "rails_helper"

RSpec.describe User, :type => :model do
  it "party can be created" do
    party = Party.create(name: "End of M3 Party")

    expect(Party.last.name).to eq(party.name)
  end

  it "name must be unique" do
    party_one = User.create(name: "End of M3 Party")
    party_two = User.create(name: "End of M3 Party")

    expect(party_one.id).not_to eq(nil)
    expect(party_two.id).to eq(nil)
  end

  it "creates a slug upon creation" do
    party = Party.create(name: "End of M3 Party")

    expect(Party.last.name).to eq(party.name)
    expect("end-of-m3-party").to eq(party.slug)
  end
end
