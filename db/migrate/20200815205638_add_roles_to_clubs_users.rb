class AddRolesToClubsUsers < ActiveRecord::Migration[6.0]
  def change
    drop_table :roles_users

    rename_table :clubs_users, :clubs_users_roles

    add_reference :clubs_users_roles, :role
  end
end
