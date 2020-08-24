class AddIdToClubsUsersRoles < ActiveRecord::Migration[6.0]
  def change
    add_column :clubs_users_roles, :id, :primary_key
  end
end
