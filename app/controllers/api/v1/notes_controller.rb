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
        notes = if current_user.counselor_for_club?(current_club.id)
                  current_club.notes
                else
                  current_club.notes.joins(:user_mission).where(missions_assigned_users: { user_id: current_user.id })
                end

        render jsonapi: notes, include: [:mission, noteSections: [:note]], expose: { current_user: current_user }
      end

      def show
        render jsonapi: current_user.notes.find(params[:id]), include: [:mission, noteSections: [:note]]
      end

      def update
        note = if current_user.counselor_for_club?(current_club.id)
                 current_club.notes.find(params[:id])
               else
                 current_user.notes.find(params[:id])
               end

        note.note_sections.destroy_all
        NoteSection.create_sections(note, params[:sections])

        render jsonapi: note
      end

      def destroy
        note = if current_user.counselor_for_club?(current_club.id)
                 current_club.notes.find(params[:id])
               else
                 current_user.notes.find(params[:id])
               end

        note.destroy!

        head :ok
      end
    end
  end
end
