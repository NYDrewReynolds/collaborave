class PartiesController < ApplicationController
  before_action :set_party, only: [:show, :edit, :update]

  def show
  end

  def new
    @party = Party.new
  end

  def create
    @party = Party.new(party_params)

    if @party.save
      flash[:success] = 'Party was successfully created.'
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
    @party = Party.find(params[:id])
  end
end