module Api
  module V1
    class Api::V1::ClubsController < ApplicationController
      before_action :set_club, only: [:show, :edit, :update, :destroy]
      before_action :sanitize_params, only: [:create]

      def index
        render jsonapi: Club.all, include: [:cover]
      end

      def show
        render jsonapi: @club
      end

      def create
        club = Club.new(club_params)
        club.save
        render jsonapi: club, include: [:cover]
      rescue ActiveRecord::RecordInvalid => error
        render json: { detail: error }, status: STATUS_422
      end

      def update
        @club.update(club_params)
        render jsonapi: @club
      rescue ActiveRecord::RecordInvalid => error
        render json: { detail: error }, status: STATUS_422
      end

      def destroy
        @club.destroy!
        head :ok
      end

      private

      def set_club
        @club = Club.find(params[:id])
      end

      def club_params
        params.permit(:id, :name, :category, :area, :formal)
      end

      def sanitize_params
        params[:category] = params[:category].to_i
        params[:area] = params[:area].to_i
      end
    end
  end
end
