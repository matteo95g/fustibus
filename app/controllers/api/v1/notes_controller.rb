module Api
  module V1
    class NotesController < ApplicationController
      # before_action :authenticate_user!

      def create
        user_mission = UserMission.create!(user_id: current_user.id, mission_id: params[:selected_mission_id])
        note = Note.create!(user_mission: user_mission)

        NoteSection.create_sections(note, params[:sections])

        # render jsonapi: note_section
      rescue
        note.destroy!
      end

      def index
        render jsonapi: current_user.notes, include: [:mission, noteSections: [:note]]
      end

      def update
        note_section = @note.note_sections.find(params[:id])
        note_section.update!(update_params)

        render jsonapi: note_section
      end
    end
  end
end
