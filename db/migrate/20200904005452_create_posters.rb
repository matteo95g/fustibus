class CreatePosters < ActiveRecord::Migration[6.0]
  def change
    create_table :posters do |t|
      t.text :title
      t.text :abstract
      t.text :results
      t.text :conclusions
      t.text :introduction
      t.text :methodology
      t.text :bibliography
      t.text :acknowledgments
      t.belongs_to :club

      t.timestamps
    end
  end
end
