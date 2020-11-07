class AddEnabledToMissions < ActiveRecord::Migration[6.0]
  def change
    add_column :missions, :enabled, :boolean, default: false
  end
end
