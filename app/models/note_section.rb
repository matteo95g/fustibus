class NoteSection < ApplicationRecord
  serialize :list, Array
  acts_as_list scope: :note

  belongs_to :note

  enum section_type: [:text, :text_and_image, :list, :image, :file]
end
