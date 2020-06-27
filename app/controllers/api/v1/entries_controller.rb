module Api
  module V1
    class Api::V1::EntriesController < ApplicationController
      before_action :set_entry, only: [:show, :edit, :update, :destroy]
      before_action :sanitize_params, only: [:create, :edit]

      def index
        field_folder = FieldFolder.includes(:entries).find(params[:field_folder_id])
        render jsonapi: field_folder.entries.order(:date)
      end

      def show
        render jsonapi: @entry, include: [:fieldFolder]
      end

      def create
        entry = Entry.new(entry_params)

        entry.save!
        render jsonapi: entry
      end

      def update
        @entry.update!(update_params)
        render jsonapi: @entry
      end

      def destroy
        @entry.destroy!
        head :ok
      end

      private

      def set_entry
        @entry = Entry.find(params[:id])
      end

      def entry_params
        params.permit(:id, :title, :description, :field_folder_id, :date)
      end

      def update_params
        params.permit(:title, :description, :date)
      end

      def sanitize_params
        params[:club_id] = params[:club_id].to_i
      end
    end
  end
end
