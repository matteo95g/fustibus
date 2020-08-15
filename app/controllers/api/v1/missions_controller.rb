module Api
  module V1
    class MissionsController < ApplicationController
      before_action :authenticate_user!

      before_action :set_club, only: [:index, :create]
      before_action :set_mission, only: [:show, :edit, :update, :destroy]

      def index
        missions = @club.missions
        render jsonapi: missions
      end

      def create
        mission = Mission.new(create_params)
        mission.club = @club
        mission.save!

        render jsonapi: mission
      end

      def update
        @mission.update(mission_params)
        render jsonapi: @mission
      end

      def destroy
        @mission.destroy!
        head :ok
      end

      private
      def set_club
        @club = current_user.clubs.find(params[:club_id])
      end

      def set_mission
        @mission = Mission.find(params[:id])
      end

      def create_params
        params.permit(:description)
      end

      def mission_params
        params.permit(:description, :completed)
      end
    end
  end
end
