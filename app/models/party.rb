class Party < ActiveRecord::Base
  belongs_to :user
  has_many :party_songs
  has_many :songs, through: :party_songs
end
