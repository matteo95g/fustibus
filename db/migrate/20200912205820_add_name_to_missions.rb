class AddNameToMissions < ActiveRecord::Migration[6.0]
  def change
    add_column :missions, :name, :string
  end
end
