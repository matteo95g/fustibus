class Entry < ApplicationRecord
  include Filterable

  belongs_to :field_folder

  scope :filter_by_content, -> (content) { where("title like ?", "%#{content}%").or(where("description like ?", "%#{content}%"))}
  scope :filter_by_date, -> (date) { where(date: date) }
end
