module Api
  module V1
    class ClubsController < ApplicationController
      before_action :authenticate_user!

      include FileUploaderHelper

      before_action :set_club, only: [:show, :update, :destroy]
      before_action :allow_if_counselor, only: [:update, :destroy]
      before_action :sanitize_params, only: [:create, :update]

      def index
        clubs = current_user.clubs.paginate(page: params[:page], per_page: PER_PAGE)
        render jsonapi: clubs, include: [:cover, :fieldFolder], meta: build_meta(clubs), expose: { current_user: current_user }
      end

      def show
        render jsonapi: @club, include: [:fieldFolder, :cover, users: [:image]], expose: { current_user: current_user }
      end

      def create
        club = Club.new(club_params)

        if params[:cover].present?
          cover = build_cover(params[:cover])
          club.cover = cover
        end

        club.save!

        ClubsUsersRole.create!(user_id: current_user.id, club_id: club.id, role: Role.counselor)
        club.create_field_folder!
        club.create_poster!
        club.create_report!
        current_user.update(current_club_id: club.id) unless current_club

        render jsonapi: club, include: [:cover, :fieldFolder], expose: { current_user: current_user }
      end

      def update
        @club.update!(club_params)

        if params[:cover].present?
          cover = build_cover(params[:cover])
          @club.cover = cover
        end

        @club.save!

        render jsonapi: @club, include: [:cover, :fieldFolder], expose: { current_user: current_user }
      end

      def destroy
        @club.destroy!

        unless current_club
          first_user_club = current_user.clubs.first

          current_user.update(current_club_id: first_user_club.id) if first_user_club
        end

        head :ok
      end

      def current
        return head :forbidden unless current_user.clubs.exists?(id: params[:club_id])

        current_user.update!(current_club_id: params[:club_id])

        head :no_content
      end

      def leave
        return head :forbidden unless current_user.clubs.exists?(id: params[:club_id])

        current_user.clubs_users_roles
                    .delete(current_user.clubs_users_roles.where(club_id: params[:club_id]))

        head :no_content
      end

      private

      def set_club
        @club = current_user.clubs.find(params[:id])
      end

      def allow_if_counselor
        unless current_user.counselor_for_club?(params[:id])
          render json: { detail: 'Forbidden' }, status: :unauthorized
        end
      end

      def club_params
        params.permit(:name, :category, :area, :formal, :cover, :description)
      end

      def sanitize_params
        params[:category] = params[:category].to_i
        params[:area] = params[:area].to_i
      end
    end
  end
end
