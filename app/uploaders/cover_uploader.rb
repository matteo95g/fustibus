class CoverUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave

  process resize_and_pad: [380, 250]
end
