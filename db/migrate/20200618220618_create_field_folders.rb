class CreateFieldFolders < ActiveRecord::Migration[6.0]
  def change
    create_table :field_folders do |t|
      t.references  :club
      t.timestamps
    end
  end
end
