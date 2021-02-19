module Api
  module V1
    class MissionsController < ApplicationController
      before_action :authenticate_user!

      before_action :set_club, only: [:index, :create, :update, :destroy]
      before_action :set_mission, only: [:show, :update, :destroy]

      def index
        missions = @club.missions
        missions = missions.where(status: params[:status]) if params[:status]

        if params[:without_notes] == "true"
          mission_ids_with_notes = UserMission.where(mission_id: missions.ids).joins(:note).pluck(:mission_id)
          missions = missions.where.not(id: mission_ids_with_notes)
        end

        render jsonapi: missions
      end

      def show
        render jsonapi: @image
      end

      def create
        return head :forbidden unless current_user.counselor_for_club?(@club.id)

        mission = Mission.new(create_params)
        mission.club = @club
        mission.save!

        render jsonapi: mission
      end

      def update
        return head :forbidden unless current_user.counselor_for_club?(@club.id)

        @mission.update(mission_params)
        render jsonapi: @mission
      end

      def destroy
        return head :forbidden unless current_user.counselor_for_club?(@club.id)

        @mission.destroy!
        head :ok
      end

      private

      def set_club
        @club = current_user.current_club
      end

      def set_mission
        @mission = Mission.find(params[:id])
      end

      def create_params
        params.permit(:name, :description, :thropy)
      end

      def mission_params
        params.permit(:name, :description, :completed, :status, :thropy)
      end
    end
  end
end
