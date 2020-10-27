class CreateNoteSections < ActiveRecord::Migration[6.0]
  def change
    create_table :note_sections do |t|
      t.integer :section_type, null: false
      t.string :url
      t.text :text
      t.text :list
      t.integer :position

      t.belongs_to :note
      t.timestamps
    end
  end
end
