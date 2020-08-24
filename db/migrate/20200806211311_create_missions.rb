class CreateMissions < ActiveRecord::Migration[6.0]
  def change
    create_table :missions do |t|
      t.string :description
      t.boolean :completed, :default => false
      t.belongs_to :club

      t.timestamps
    end
  
    create_table :missions_assigned_users, id: false do |t|
      t.belongs_to :user
      t.belongs_to :mission
    end
  end
end
