class SerializableFieldFolder < SerializableBase
  attribute :club_id

  belongs_to :club
end
