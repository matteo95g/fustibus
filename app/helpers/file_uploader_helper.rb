require 'base64'

module FileUploaderHelper
  def build_image(file)
    image = Image.new(file: decode_base64_image(file[:data], file[:name], file[:type]))
  end

  def build_cover(file)
    cover = Cover.new(file: decode_base64_image(file[:data], file[:name], file[:type]))
  end

  def decode_base64_image(encoded_file, name, type)
    decoded_file = Base64.decode64(encoded_file)
    file = Tempfile.new([name.partition('.').first, ".#{type.partition('/').last}"])
    file.binmode
    file.write(decoded_file)

    file
  end
end
