class PartiesController < ApplicationController
  before_action :set_party, only: [:show, :edit, :update]

  def show
  end

  def new
    @party = Party.new
  end

  def create
    @party = Party.new(party_params)
    @party.user_id = current_user.id
    if @party.save
      redirect_to party_path(@party)
    else
      redirect_to home_path
    end
  end

  private

  def party_params
    params.require(:party).permit(:name)
  end

  def set_party
    @party = Party.friendly.find(params[:id])
  end
end
