require 'rails_helper'

describe 'user can log out', type: :feature do
  include Capybara::DSL

  before(:each) do
    Capybara.app = Collaborave::Application
    stub_omniauth
    visit root_path
    click_on "Login With Twitter"
  end

  it 'user can log out' do
    assert_equal '/home', current_path
    assert page.has_content?("Drew Reynolds")
    assert page.has_content?("Logout")

    click_on "Logout"
    assert_equal root_path, current_path
  end
end
