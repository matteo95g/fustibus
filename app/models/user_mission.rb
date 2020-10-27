class UserMission < ApplicationRecord
  self.table_name = :missions_assigned_users

  belongs_to :user
  belongs_to :mission
end
