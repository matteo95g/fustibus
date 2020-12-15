class InvitationsMailer < ApplicationMailer
  add_template_helper(UserHelper)

  def existed_user_invited
    @club = Club.find(params[:club_id])
    @user = User.find(params[:user_id])

    mail(to: @user.email, subject: 'Tienes una nueva invitación a un club de ciencia!')
  end

  def new_user_invited
    @club = Club.find(params[:club_id])
    @email = params[:email]

    mail(to: @email, subject: 'Tienes una nueva invitación a un club de ciencia!')
  end
end
