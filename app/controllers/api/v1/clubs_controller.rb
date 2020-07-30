module Api
  module V1
    class Api::V1::ClubsController < ApplicationController
      before_action :authenticate_user!

      include FileUploaderHelper

      before_action :set_club, only: [:show, :edit, :update, :destroy]
      before_action :sanitize_params, only: [:create]

      def index
        clubs = current_user.clubs.paginate(page: params[:page], per_page: PER_PAGE)
        render jsonapi: clubs, include: [:cover, :fieldFolder], meta: build_meta(clubs)
      end

      def show
        render jsonapi: @club, include: [:fieldFolder, :cover]
      end

      def create
        club = Club.new(club_params)

        if params[:cover].present?
          cover = build_cover(params[:cover])
          club.cover = cover
        end

        club.save!
        ClubsUsers.create!(user_id: current_user.id, club_id: club.id)
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
        @club = current_user.clubs.find(params[:id])
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
