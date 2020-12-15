module UserHelper
  def user_name_or_email(user)
    return user.names.titleize if user.names.present?
    return user.last_names.titleize if user.last_names.present?
    return user.email
  end
end
