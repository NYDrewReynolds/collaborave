require 'rails_helper'

describe 'user can log in', type: :feature do
  include Capybara::DSL

  before(:each) do
    Capybara.app = Collaborave::Application
    stub_omniauth
    visit root_path
    assert_equal 200, page.status_code
    click_on "Login With Twitter"
  end

  it 'user can create a party' do
    assert_equal '/home', current_path
    assert page.has_content?("Drew Reynolds")
    assert page.has_content?("Logout")

    fill_in('party_name', with: 'Test Party')
    click_on("Get the Party Started!")
    assert page.has_content?("Test Party")
    assert page.has_content?(" Share Your Party Link")
  end

  it 'user must enter party name' do
    Party.create(name: "test")

    fill_in('party_name', with: 'test')
    click_on("Get the Party Started!")
    assert_equal '/home', current_path
  end
end
