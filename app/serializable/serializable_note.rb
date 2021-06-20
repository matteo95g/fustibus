class SerializableNote < SerializableBase
  has_many :note_sections
  belongs_to :user_mission
  has_one :mission

  attribute :mission_id
  attribute :owner do
    @object.owner unless @current_user == @object.user_mission&.user
  end
end
