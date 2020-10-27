class SerializableNoteSection < SerializableBase
  attribute :section_type
  attribute :url
  attribute :text
  attribute :list
  attribute :position

  belongs_to :note
end
