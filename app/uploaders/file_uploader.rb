class FileUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave

  version :icon do
    process resize_and_pad: [50, 50]
  end

  version :thumb do
    process resize_and_pad: [200, 200]
  end

  version :large do
    process resize_and_pad: [1500, 1500]
  end
end
