module Api
  module V1
    class Api::V1::EntriesController < ApplicationController
      before_action :set_entry, only: [:show, :edit, :update, :destroy]
      before_action :sanitize_params, only: [:create, :edit]
      before_action :authenticate_user!

      def index
        render jsonapi: Entry.filter(filter_params).where(field_folder_id: params[:field_folder_id]).order(date: :desc), include: [:fieldFolder]
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

      def filter_params
        params.slice(:content, :date)
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
