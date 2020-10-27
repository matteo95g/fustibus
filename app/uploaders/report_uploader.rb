class ReportUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave

  def public_id
    "reports/#{model.club.name}/#{model.name}"
  end
end
