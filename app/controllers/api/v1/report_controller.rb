module Api
  module V1
    class ReportController < ApplicationController
      before_action :authenticate_user!
      before_action :set_report, only: [:current]

      include FileUploaderHelper

      def current
        render jsonapi: @report
      end

      def update
        if params[:report].present?
          report = build_report(params[:report], current_club.id)
          current_club.report = report
          current_club.save!
        end

        render jsonapi: report.reload
      end

      private

      def set_report
        @report = current_club.report
      end

      def report_params
        params.permit(:file)
      end
    end
  end
end
