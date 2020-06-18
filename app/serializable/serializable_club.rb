class SerializableClub < SerializableBase
  attribute :name
  attribute :category
  attribute :area
  attribute :formal
  attribute :created_at
  attribute :updated_at

  has_one :cover
  has_one :field_folder
end
