module Api
  module V1
    class PostersController < ApplicationController
      before_action :authenticate_user!
      before_action :set_poster, only: [:show, :update]

      def create
        poster = Poster.new(poster_params)
        poster.club = current_user.current_club
        poster.save!

        render jsonapi: poster
      end

      def show
        render jsonapi: @poster
      end

      def update
        @poster.update(poster_params)
        render jsonapi: @poster
      end

      private

      def set_poster
        @poster = current_user.current_club.poster
      end

      def poster_params
        params.permit(:title, :abstract, :results, :conclusions, :introduction, :methodology, :bibliography, :acknowledgments)
      end
    end
  end
end
