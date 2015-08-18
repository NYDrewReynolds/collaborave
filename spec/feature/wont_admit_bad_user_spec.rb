require 'rails_helper'

describe 'user with invalid credentials', type: :feature do
  include Capybara::DSL

  before(:each) do
    Capybara.app = Collaborave::Application
  end

  xit 'wont be logged in' do
    visit root_path
    assert_equal 200, page.status_code
    click_on "Login With Twitter"
    assert_equal '/', current_path
  end

end
