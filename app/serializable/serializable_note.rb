class SerializableNote < SerializableBase
  has_many :note_sections
  belongs_to :user_mission
end
