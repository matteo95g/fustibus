class FileUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave

  def public_id
    "images/#{model.owner_type.pluralize.downcase}/#{model.owner_id}/#{SecureRandom.uuid}"
  end

  version :icon do
    process resize_and_pad: [50, 50]
  end

  version :thumb do
    process resize_and_pad: [200, 200]
  end

  version :large do
    process resize_and_pad: [1500, nil]
  end

  version :cover do
    process resize_and_pad: [380, 250]
  end
end
