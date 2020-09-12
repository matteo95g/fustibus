class Mission < ApplicationRecord
  belongs_to :club
  has_and_belongs_to_many :assigned_users, class_name: 'User', join_table: :missions_assigned_users

  validates :description, presence: true, allow_blank: false
end