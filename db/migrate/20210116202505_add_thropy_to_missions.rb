class AddThropyToMissions < ActiveRecord::Migration[6.0]
  def change
    add_column :missions, :thropy, :string
  end
end
