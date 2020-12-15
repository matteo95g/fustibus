class Note < ApplicationRecord
  has_many :note_sections, dependent: :destroy
  belongs_to :user_mission
  has_one :mission, through: :user_mission
end
