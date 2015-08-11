class AddSlugToParties < ActiveRecord::Migration
  def change
    add_column :parties, :slug, :string
  end
end
