class SerializableUserMission < SerializableBase
  belongs_to :user
  belongs_to :mission
end
