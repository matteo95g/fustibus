class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtBlacklist

  has_and_belongs_to_many :assigned_missions, class_name: 'Mission', join_table: :missions_assigned_users

  has_many :clubs_users_roles
  has_many :clubs, through: :clubs_users_roles
  has_many :roles,
           -> (user) { where(clubs_users_roles: { club_id: user.current_club }) },
           through: :clubs_users_roles

  has_many :invitations, primary_key: :email, foreign_key: :email

  belongs_to :current_club, optional: true, class_name: 'Club'

  def is_counselor
    roles.where(name: Role::COUNSELOR).any?
  end

  def club_invitations(status)
    invitations.where(status: status).includes(:club).map(&:club)
  end
end
