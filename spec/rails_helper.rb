# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
# Prevent database truncation if the environment is production
abort("The Rails environment is running in production mode!") if Rails.env.production?
require 'spec_helper'
require 'rspec/rails'

ActiveRecord::Migration.maintain_test_schema!

RSpec.configure do |config|
  config.fixture_path = "#{::Rails.root}/spec/fixtures"

  config.use_transactional_fixtures = true

  config.infer_spec_type_from_file_location!
end

def stub_omniauth
  OmniAuth.config.test_mode = true
  OmniAuth.config.mock_auth[:twitter] = OmniAuth::AuthHash.new({
                                                                   provider: 'twitter',
                                                                   extra: {
                                                                       raw_info: {
                                                                           user_id: "1",
                                                                           name: "Drew Reynolds",
                                                                           screen_name: "NYDrewReynolds",
                                                                       }
                                                                   },
                                                                   credentials: {
                                                                       token: "367814457-zDEbWLKqoUZX7hHfw4ef0ggeHmEgPJlrnTOGSdEx",
                                                                       secret: "YZBvOtN3RFjSkFakf3uNYEGgJzkBFhcH9WEmG4kPhJGLp",
                                                                   }
                                                               })
end
