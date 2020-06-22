module Api
  module V1
    class Api::V1::ClubsController < ApplicationController
      include FileUploaderHelper

      before_action :set_club, only: [:show, :edit, :update, :destroy]
      before_action :sanitize_params, only: [:create]

      def index
        render jsonapi: Club.all, include: [:cover, :fieldFolder]
      end

      def show
        render jsonapi: @club, include: [:fieldFolder]
      end

      def create
        club = Club.new(club_params)

        if params[:cover].present?
          cover = build_cover(params[:cover])
          club.cover = cover
        end

        club.save!
        club.create_field_folder!
        render jsonapi: club, include: [:cover, :fieldFolder]
      end

      def update
        @club.update(club_params)
        render jsonapi: @club, include: [:cover, :fieldFolder]
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
        params.permit(:id, :name, :category, :area, :formal, :cover)
      end

      def sanitize_params
        params[:category] = params[:category].to_i
        params[:area] = params[:area].to_i
      end
    end
  end
end
