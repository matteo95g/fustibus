class AddStatusToMissions < ActiveRecord::Migration[6.0]
  def change
    add_column :missions, :status, :integer, default: 0
    remove_column :missions, :enabled, :boolean
  end
end
