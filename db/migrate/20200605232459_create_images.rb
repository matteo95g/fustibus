class CreateImages < ActiveRecord::Migration[6.0]
  def change
    create_table :images do |t|
      t.string :file
      t.string :type
      t.references :owner, polymorphic: true, index: true

      t.timestamps
    end
  end
end
