module Api
  module V1
    class UsersController < ApplicationController
      before_action :authenticate_user!

      include FileUploaderHelper

      before_action :set_user, only: [:update]

      def update
        @user.update!(user_params)

        if params[:profile_image].present?
          profile_image = build_image(params[:profile_image])
          @user.image = profile_image
        end

        @user.save!

        render jsonapi: @user, include: [:roles, :image, currentClub: [:cover]]
      end

      def add_role
        current_club_id = current_user.current_club.id

        return head :forbidden unless current_user.counselor_for_club?(current_club_id)

        user = User.find(params[:id])

        return head :forbidden unless user.clubs.exists?(current_club_id)

        user.clubs_users_roles << ClubsUsersRole.create(
          role: Role.find_by!(name: params[:role_name]),
          club_id: current_club_id
        )

        head :no_content
      end

      def delete_role
        current_club_id = current_user.current_club.id

        return head :forbidden unless current_user.counselor_for_club?(current_club_id)

        user = User.find(params[:id])

        return head :forbidden unless user.clubs.exists?(current_club_id)

        user.clubs_users_roles.delete(
          user.clubs_users_roles.where(
            role: Role.find_by!(name: params[:role_name]),
            club_id: current_club_id
          )
        )

        head :no_content
      end

      private

      def set_user
        return head :unauthorized unless params[:id].to_i == current_user.id
        @user = User.find(params[:id])
      end

      def user_params
        params.permit(:email, :names, :last_names, :birthday, :institution, :about_me, :phone, :department)
      end
    end
  end
end
