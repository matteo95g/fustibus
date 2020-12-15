class NoteSection < ApplicationRecord
  include FileUploaderHelper

  serialize :list, Array
  acts_as_list scope: :note

  belongs_to :note

  enum section_type: [:text, :text_and_image, :list, :image, :file]

  def self.create_sections(note, sections)
    sections.each do |section, index|
      attributes = {}

      attributes = case section[:section_type]
        when section_types[:text]
          { text: section[:payload] }
        when section_types[:text_and_image]
          url = upload_image(section[:payload][:image], note.id, index)

          { text: section[:payload][:text], url: url }
        when section_types[:list]
          { list: section[:payload] }
        when section_types[:image]
          url = upload_image(section[:payload], note.id, index)

          { url: url }
        end

        attributes[:note_id] = note.id
        attributes[:section_type] = section[:section_type]

      NoteSection.create!(attributes)
    end
  end

  def self.upload_image(data, note_id, index)
    file = { data: data, name: "note-#{note_id}section-#{index}", type: "" }
    image = ApplicationController.helpers.build_image(file)
    image.owner_type = "Note"
    image.owner_id = note_id
    image.save
    image.reload

    url = image.file.url
  end

  def mission_id
    note.mission.id
  end
end
