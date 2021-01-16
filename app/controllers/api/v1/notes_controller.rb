module Api
  module V1
    class NotesController < ApplicationController
      before_action :authenticate_user!

      def create
        user_mission = UserMission.create!(user_id: current_user.id, mission_id: params[:selected_mission_id])
        note = Note.create!(user_mission: user_mission)

        NoteSection.create_sections(note, params[:sections])
      rescue
        note.destroy!
      end

      def index
        render jsonapi: current_user.notes, include: [:mission, noteSections: [:note]]
      end

      def show
        render jsonapi: current_user.notes.find(params[:id]), include: [:mission, noteSections: [:note]]
      end

      def update
        note = current_user.notes.find(params[:id])
        note.note_sections.destroy_all
        NoteSection.create_sections(note, params[:sections])
        render jsonapi: note
      end

      def destroy
        current_user.notes.find(params[:id]).destroy!
        head :ok
      end
    end
  end
end
