module Api
  module V1
    module Devise
      class RegistrationsController < ::Devise::RegistrationsController
        def create
          user = User.create!(sign_up_params)

          sign_up(resource_name, user)

          render jsonapi: user,
                 include: [:roles, :image, invitations: [club: [:cover]], currentClub: [:cover]]
        rescue ActiveRecord::RecordInvalid => e
          render json: e.record.errors, status: 422
        end
      end
    end
  end
end
