class ApplicationController < ActionController::Base
  include ApplicationHelper

  STATUS_404 = 404
  STATUS_422 = 422

  protect_from_forgery with: :null_session

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ArgumentError, with: :argument_error
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

  respond_to :json

  private

  def record_not_found(exception)
    render json: { detail: exception }, status: STATUS_404
  end

  def argument_error(exception)
    render json: { detail: exception }, status: STATUS_422
  end

  def record_invalid(exception)
    render json: { detail: exception }, status: STATUS_422
  end
end
