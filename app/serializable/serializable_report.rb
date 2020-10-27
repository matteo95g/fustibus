class SerializableReport < SerializableBase
  attribute :file
  attribute :name

  belongs_to :club
end
