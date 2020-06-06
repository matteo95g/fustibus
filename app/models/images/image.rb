class Image < ApplicationRecord
  belongs_to :owner, polymorphic: true, optional: true, touch: true

  mount_uploader :file, FileUploader
end
