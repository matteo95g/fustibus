class InvitationsMailer < ApplicationMailer
  def new_user_invited
    @club = Club.find(params[:club_id])
    @email = params[:email]

    mail(to: params[:email], subject: 'Tienes una nueva invitación a un club de ciencia!')
  end
end
