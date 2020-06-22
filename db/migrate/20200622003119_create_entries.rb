class CreateEntries < ActiveRecord::Migration[6.0]
  def change
    create_table :entries do |t|
      t.string :title
      t.text :description
      t.date :date
      t.references :field_folder

      t.timestamps
    end
  end
end
