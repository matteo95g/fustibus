class Note < ApplicationRecord
  has_many :note_sections
  belongs_to :user_mission
end
