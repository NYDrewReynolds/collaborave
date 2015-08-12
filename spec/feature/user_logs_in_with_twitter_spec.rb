require 'rails_helper'

describe 'user can log in', type: :feature do
  include Capybara::DSL

  before(:each) do
    Capybara.app = Collaborave::Application
    stub_omniauth
  end

  it 'user can login with Twitter' do
    visit root_path
    assert_equal 200, page.status_code
    click_on "Login With Twitter"
    assert_equal '/home', current_path
    assert page.has_content?("Drew Reynolds")
    assert page.has_content?("Logout")
  end
end
