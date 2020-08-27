class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtBlacklist

  has_and_belongs_to_many :assigned_missions, class_name: 'Mission', join_table: :missions_assigned_users

  has_one :image, as: :owner, dependent: :destroy

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

  def counselor_for_club(club_id)
    clubs_users_roles.joins(:role).where(
      clubs_users_roles: { club_id: club_id },
      roles: { name: Role::COUNSELOR }
    ).exists?
  end

  def club_invitations(status)
    invitations.where(status: status).includes(:club).map(&:club)
  end

  def grouped_roles
    grouped_roles = {}
    clubs_users_roles.pluck(:club_id, :role_id).each do |club_id, role_id|
      if grouped_roles.key?(club_id)
        grouped_roles[club_id] << role_id if role_id
      else
        grouped_roles[club_id] = []
        grouped_roles[club_id] << role_id if role_id
      end
    end
    grouped_roles
  end
end
