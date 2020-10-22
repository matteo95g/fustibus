class CreateReports < ActiveRecord::Migration[6.0]
  def change
    create_table :reports do |t|
      t.string :file
      t.string :name
      t.belongs_to :club
    end
  end
end
