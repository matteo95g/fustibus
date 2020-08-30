module Api
  module V1
    class PostersController < ApplicationController
      before_action :authenticate_user!

      def create
        poster = Poster.new(create_params)
        poster.club = current_user.current_club
        poster.save!

        render jsonapi: poster
      end

      private

      def create_params
        params.permit(:title, :abstract, :results, :conclusions, :introduction, :methodology, :bibliography, :acknowledgments)
      end
    end
  end
end
