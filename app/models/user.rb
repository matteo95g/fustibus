class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtBlacklist

  has_and_belongs_to_many :clubs
  has_and_belongs_to_many :roles

  has_many :invitations, primary_key: :email, foreign_key: :email

  def is_counselor
    roles.where(name: Role::COUNSELOR).any?
  end

  def club_invitations(status)
    invitations.where(status: status).includes(:club).map(&:club)
  end
end
