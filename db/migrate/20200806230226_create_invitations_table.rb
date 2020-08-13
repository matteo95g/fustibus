class CreateInvitationsTable < ActiveRecord::Migration[6.0]
  def change
    create_table :invitations, id: false do |t|
      t.integer    :status
      t.string     :email
      t.belongs_to :club
    end
  end
end
