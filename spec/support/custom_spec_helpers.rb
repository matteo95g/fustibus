module CustomSpecHelpers
  def json_body
    JSON.parse(response.body)
  end
end
