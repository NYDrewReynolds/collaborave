class Party < ActiveRecord::Base
  belongs_to :user
  has_many :party_songs
  has_many :songs, through: :party_songs

  validates :name, presence: true
  validates :slug, presence: true

  extend FriendlyId
  friendly_id :name, use: :slugged

end
