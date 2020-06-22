class SerializableEntry < SerializableBase
  attribute :title
  attribute :description
  attribute :date

  belongs_to :field_folder
end
