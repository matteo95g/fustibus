class CreateClubsUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :clubs_users, id: false do |t|
      t.belongs_to :club
      t.belongs_to :user
    end
  end
end
