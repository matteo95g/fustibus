class Report < ApplicationRecord
  belongs_to :club

  mount_uploader :file, ReportUploader
end
