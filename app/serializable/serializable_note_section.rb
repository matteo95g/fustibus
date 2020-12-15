class SerializableNoteSection < SerializableBase
  attribute :section_type
  attribute :url
  attribute :text
  attribute :list
  attribute :position
  attribute :mission_id

  belongs_to :note
end
