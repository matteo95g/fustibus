module Api
  module V1
    class Api::V1::ImagesController < ApplicationController
      before_action :set_image, only: [:show, :edit, :update, :destroy]

      def index
        render jsonapi: Images.all
      end

      def show
        render jsonapi: @image
      end

      def create
        image = Image.new(image_params)
        image.save
        render jsonapi: image
      rescue ActiveRecord::RecordInvalid => error
        render json: { detail: error }, status: STATUS_422
      end

      def update
        @image.update(image_params)
        render jsonapi: @image
      rescue ActiveRecord::RecordInvalid => error
        render json: { detail: error }, status: STATUS_422
      end

      def destroy
        @image.destroy!
        head :ok
      end

      private

      def set_image
        @image = Image.find(params[:id])
      end

      def image_params
        params.permit(:id, :file, :type)
      end
    end
  end
end
