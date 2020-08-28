class AddFieldsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :names, :string
    add_column :users, :last_names, :string
    add_column :users, :birthday, :date
    add_column :users, :institution, :string
    add_column :users, :about_me, :text
    add_column :users, :phone, :string
    add_column :users, :department, :string
  end
end
