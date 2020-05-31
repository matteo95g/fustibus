class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ArgumentError, with: :argument_error

  private

  def record_not_found(exception)
    render json: { detail: exception }, status: 404
  end

  def argument_error(exception)
    render json: { detail: exception }, status: 422
  end
end
