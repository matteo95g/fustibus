module Api
  module V1
    class NotesController < ApplicationController
      before_action :authenticate_user!
      before_action :set_note, only: [:index, :update]

      def create
        user_mission = UserMission.create!(user_id: current_user.id, mission_id: params[:selected_mission_id])
        note = Note.create!(user_mission: user_mission)

        NoteSection.create_sections(note, params[:sections])

        # render jsonapi: note_section
      rescue
        note.destroy!
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
