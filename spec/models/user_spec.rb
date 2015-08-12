require "rails_helper"

RSpec.describe User, :type => :model do
  it "user can be created" do
    user = User.create(name: "Drew Reynolds")

    expect(User.last.name).to eq(user.name)

  end

  it "name must be unique" do
    user_one = User.create(name: "Drew Reynolds")
    user_two = User.create(name: "Drew Reynolds")

    expect(user_one.id).not_to eq(nil)
    expect(user_two.id).to eq(nil)
  end
end
