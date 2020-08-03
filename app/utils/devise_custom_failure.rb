class DeviseCustomFailure < Devise::FailureApp
  def http_auth_body
    error_key = warden_options[:message]

    response = if error_key == 'Signature has expired'
                {
                  error_key: :expired_token,
                  error: i18n_message(nil, :expired_token)
                }
              else
                {
                  error_key: error_key,
                  error: i18n_message
                }
              end

    response.deep_transform_keys{ |key| key.to_s.camelize(:lower) }.to_json
  end

  def i18n_message(default = nil, custom_message = nil)
    message = custom_message || warden_message || default || :unauthenticated

    if message.is_a?(Symbol)
      options = {}
      options[:resource_name] = scope
      options[:scope] = "devise.failure"
      options[:default] = [message]
      auth_keys = scope_class.authentication_keys
      keys = (auth_keys.respond_to?(:keys) ? auth_keys.keys : auth_keys).map { |key| scope_class.human_attribute_name(key) }
      options[:authentication_keys] = keys.join(I18n.translate(:"support.array.words_connector"))
      options = i18n_options(options)

      I18n.t(:"#{scope}.#{message}", **options)
    else
      message.to_s
    end
  end
end
