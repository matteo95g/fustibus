class CreateNotes < ActiveRecord::Migration[6.0]
  def change
    create_table :notes do |t|
      t.belongs_to :user_mission
    end

    add_column :missions_assigned_users, :id, :primary_key
  end
end
