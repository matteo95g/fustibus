class Mission < ApplicationRecord
  belongs_to :club
  has_and_belongs_to_many :assigned_users, class_name: 'User', join_table: :missions_assigned_users
  has_many :user_missions

  validates :description, presence: true, allow_blank: false

  INITIAL_NAME = "Primera reunión de equipo"
  INITIAL_DESC = "El objetivo de la misión es documentar todo lo relacionado con la primera reunión del equipo."

  def self.create_initial
    Mission.new(name: INITIAL_NAME, description: INITIAL_DESC)
  end
end
