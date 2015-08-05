class CreatePartySongs < ActiveRecord::Migration
  def change
    create_table :party_songs do |t|

      t.timestamps null: false
    end
  end
end
