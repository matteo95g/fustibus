class ClubsUsersRole < ApplicationRecord
  belongs_to :user
  belongs_to :club
  belongs_to :role, optional: true
end
