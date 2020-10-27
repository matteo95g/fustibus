module Api
  module V1
    class FieldFoldersController < ApplicationController
      before_action :set_field_folder
      before_action :authenticate_user!

      def current
        render jsonapi: @field_folder, include: [:entries, :club]
      end

      private

      def set_field_folder
        @field_folder = current_club.field_folder
      end
    end
  end
end
