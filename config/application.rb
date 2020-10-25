require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Fustibus
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0

    config.time_zone = "America/Montevideo"
    config.active_record.default_timezone = :local

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    config.autoload_paths.push Rails.root.join("app", "models", "images")

    config.action_mailer.delivery_method = :smtp
    config.action_mailer.smtp_settings = {
      address:              'smtp.gmail.com',
      port:                 587,
      domain:               'gmail.com',
      user_name:            ENV['SMTP_USERNAME'],
      password:             ENV['SMTP_PASSWORD'],
      authentication:       :login,
      enable_starttls_auto: true
    }

    config.generators do |g|
      g.system_tests = nil
      g.test_framework :rspec
    end

    config.middleware.delete ActionDispatch::Cookies
    config.middleware.delete ActionDispatch::Session::CookieStore

    config.i18n.default_locale = :es
  end

  Rails.application.routes.default_url_options[:host] = ENV['DEFAULT_URL_HOST'] || 'localhost:3000'
  Rails.application.routes.default_url_options[:protocol] = ENV['DEFAULT_URL_PROTOCOL'] || 'http'
end
