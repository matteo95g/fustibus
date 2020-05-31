class ClubsController < ApplicationController
  before_action :set_club, only: [:show, :edit, :update, :destroy]

  def index
    render jsonapi: Club.all
  end

  def show
    render jsonapi: @club
  end

  def create
    club = Club.new(club_params)
    club.save
    render jsonapi: club
  rescue ActiveRecord::RecordInvalid => error
    render json: { detail: error }, status: 422
  end

  def update
    @club.update(club_params)
    render jsonapi: @club
  rescue ActiveRecord::RecordInvalid => error
    render json: { detail: error }, status: 422
  end

  def destroy
    if @club.destroy
      head :ok
     else
      render json: { detail: "There was a problem deleting the club." }, status: 422
     end
  end

  private

  def set_club
    @club = Club.find(params[:id])
  end

  def club_params
    params.permit(:id, :name, :category, :area, :formal)
  end
end
