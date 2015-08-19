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

  it 'logged out user can log in from party page' do
    party = Party.create(name: "End of M3 Party")

    visit party_path(party)
    assert_equal '/parties/end-of-m3-party', current_path
    assert page.has_content?("Sign In/Sign Up")

    click_on "Sign In/Sign Up"
    assert_equal '/home', current_path
    assert page.has_content?("Drew Reynolds")
    assert page.has_content?("Logout")
  end

  it 'logged in user wont be assigned new tokens' do
    visit root_path
    assert_equal 200, page.status_code
    click_on "Login With Twitter"
    assert_equal '/home', current_path
    visit root_path
    click_on "Login With Twitter"
  end

end
