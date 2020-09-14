class AddIdToInvitations < ActiveRecord::Migration[6.0]
  def change
    add_column :invitations, :id, :primary_key
  end
end
