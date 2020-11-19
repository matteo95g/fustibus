module Api
  module V1
    class NotesController < ApplicationController
      before_action :authenticate_user!
      before_action :set_note, only: [:index, :update]
      before_action :sanitize_params, only: [:create, :update]

      def create
        note = Note.create!(create_params)

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
    end
  end
end
