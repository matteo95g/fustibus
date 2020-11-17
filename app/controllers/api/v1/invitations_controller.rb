module Api
  module V1
    class InvitationsController < ApplicationController
      before_action :authenticate_user!

      before_action :set_invitation, only: [:accept, :reject]

      def invite
        emails = params.require(:emails)
        club = Club.find(params.require(:club_id))

        return head :forbidden unless current_user.counselor_for_club?(club.id)

        emails.each do |email|
          next if club.has_user?(email: email)

          Invitation.where(
            club_id: club.id,
            email: email,
            status: :pending,
          ).first_or_create!

          if user = User.find_by(email: email)
            InvitationsMailer.with(club_id: club.id, user_id: user.id).existed_user_invited.deliver_later
          else
            InvitationsMailer.with(club_id: club.id, email: email).new_user_invited.deliver_later
          end
        end

        head :ok
      end

      def pendings
        invitations = current_user.invitations.pending

        render jsonapi: invitations, include: [club: [:cover]]
      end

      def accept
        return head :forbidden unless current_user == @invitation.user && @invitation.pending?

        @invitation.club.users << current_user
        @invitation.update!(status: :accepted)

        current_user.update(current_club: @invitation.club) unless current_club

        head :ok
      end

      def reject
        return head :forbidden unless current_user == @invitation.user && @invitation.pending?

        @invitation.update!(status: :rejected)

        head :ok
      end

      private

      def set_invitation
        @invitation = Invitation.find(params[:invitation_id])
      end
    end
  end
end
