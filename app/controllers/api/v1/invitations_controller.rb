module Api
  module V1
    class InvitationsController < ApplicationController
      before_action :authenticate_user!

      before_action :set_invitation, only: [:accept, :decline]

      def invite
        user_email = params.require(:user_email)
        club = Club.find(params.require(:club_id))

        return head :forbidden unless current_user.counselor_for_club?(club.id)

        return head :ok if club.has_user?(email: user_email)

        Invitation.where(
          club_id: club.id,
          email: user_email,
          status: :pending,
        ).first_or_create!

        # TODO: enviar mail diciendo que el usuario fue invitado a ser parte del club.
        # Si el usuario aun no existe en la app, enviar ese mail pero invitandolo
        # a crearse un usuario fustibustero

        head :ok
      end

      def pendings
        clubs_invitations = current_user.clubs_invitations(:pending)

        render jsonapi: clubs_invitations, include: :cover
      end

      def accept
        return head :forbidden unless current_user == @invitation.user && @invitation.pending?

        @invitation.club.users << current_user
        @invitation.update!(status: :accepted)

        head :ok
      end

      def reject
        return head :forbidden unless current_user == @invitation.user && @invitation.pending?

        @invitation.update!(status: :rejected)

        head :ok
      end

      private

      def set_invitation
        @invitation = Invitation.find(params[:id])
      end
    end
  end
end
