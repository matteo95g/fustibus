class LongText < ActiveRecord::Migration[6.0]
  def change
    change_column :posters, :abstract, :text, :limit => 4294967295
    change_column :posters, :results, :text, :limit => 4294967295
    change_column :posters, :conclusions, :text, :limit => 4294967295
    change_column :posters, :introduction, :text, :limit => 4294967295
    change_column :posters, :methodology, :text, :limit => 4294967295
    change_column :posters, :bibliography, :text, :limit => 4294967295
    change_column :posters, :acknowledgments, :text, :limit => 4294967295
  end
end
