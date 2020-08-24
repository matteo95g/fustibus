module Api
  module V1
    class FieldFoldersController < ApplicationController
      before_action :set_field_folder, only: [:show, :edit, :update, :destroy]
      before_action :sanitize_params, only: [:create]
      before_action :authenticate_user!

      def index
        render jsonapi: FieldFolder.all, include: [:entries]
      end

      def show
        render jsonapi: @field_folder, include: [:entries, :club]
      end

      def create
        field_folder = FieldFolder.new(field_folder_params)

        field_folder.save!
        render jsonapi: field_folder, include: [:entries]
      end

      def update
        @field_folder.update(field_folder_params)
        render jsonapi: @field_folder, include: [:entries]
      end

      def destroy
        @field_folder.destroy!
        head :ok
      end

      private

      def set_field_folder
        @field_folder = FieldFolder.includes(:entries, :club).find(params[:id])
      end

      def field_folder_params
        params.permit(:id, :club_id)
      end

      def sanitize_params
        params[:club_id] = params[:club_id].to_i
      end
    end
  end
end
