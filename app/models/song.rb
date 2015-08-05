class Song < ActiveRecord::Base
  has_many :party_songs
  has_many :parties, through: :party_songs
end
