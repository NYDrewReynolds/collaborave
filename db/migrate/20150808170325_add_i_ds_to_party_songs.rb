class AddIDsToPartySongs < ActiveRecord::Migration
  def change
    add_column :party_songs, :song_id, :integer
    add_column :party_songs, :party_id, :integer
  end
end
