class HomeController < ApplicationController
  def show
    @party = Party.new
  end
end
