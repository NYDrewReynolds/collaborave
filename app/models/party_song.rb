class PartySong < ActiveRecord::Base
  belongs_to :party
  belongs_to :song
end
