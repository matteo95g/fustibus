class AddCurrentClubToUsers < ActiveRecord::Migration[6.0]
  def change
    add_reference :users, :current_club
  end
end
