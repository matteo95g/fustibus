class SerializableImage < SerializableBase
  attribute :file
  attribute :type
  attribute :created_at
  attribute :updated_at
  attribute :owner_type
  attribute :owner_id
end
