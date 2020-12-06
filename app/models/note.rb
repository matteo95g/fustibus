class Note < ApplicationRecord
  has_many :note_sections, dependent: :destroy
  belongs_to :user_mission
end
