module Api
  module V1
    class NoteSectionsController < ApplicationController
      before_action :authenticate_user!
      before_action :set_note, only: [:index, :update]
      before_action :sanitize_params, only: [:create, :update]

      def create
        note_section = NoteSection.create!(create_params)

        render jsonapi: note_section
      end

      def index
        render jsonapi: @note.note_sections, include: [note: [userMission: [:mission, :user]]]
      end

      def update
        note_section = @note.note_sections.find(params[:id])
        note_section.update!(update_params)

        render jsonapi: note_section
      end

      private

      def sanitize_params
        params[:note_id] = params[:note_id].to_i
        params[:section_type] = params[:section_type].to_i
      end

      def set_note
        @note = Note.find(params[:note_id])
      end

      def create_params
        section_type = params[:section_type].to_i
        permited_params = filter_by_type(section_type)

        params.permit(permited_params << [:section_type, :note_id])
      end

      def update_params
        section_type = params[:section_type].to_i
        permited_params = filter_by_type(section_type)

        params.permit(permited_params << [:position])
      end

      def filter_by_type(section_type)
        case section_type
        when NoteSection.section_types[:text]
          [:text]
        when NoteSection.section_types[:text_and_image]
          [:text, :url]
        when NoteSection.section_types[:list]
          [:list]
        when NoteSection.section_types[:image], NoteSection.section_types[:file]
          [:url]
        end
      end
    end
  end
end
