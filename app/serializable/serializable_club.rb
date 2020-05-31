class SerializableClub < JSONAPI::Serializable::Resource
  type 'clubs'
  attribute :name
  attribute :category
  attribute :area
  attribute :formal
  attribute :created_at
  attribute :updated_at
end
