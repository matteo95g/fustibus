class Club < ApplicationRecord
  enum category: { abejitas: 0, colibri: 1, cardenal: 2, churrinche: 3, chaja: 4, nandu: 5, tero: 6, hornero: 7 }
  enum area: { science: 0, technology: 1, social: 2 }

  scope :formal, -> { where(formal: true) }

  has_one :cover, as: :owner, dependent: :destroy
  has_one :field_folder, dependent: :destroy
  has_one :poster, dependent: :destroy
  has_one :report, dependent: :destroy

  has_many :clubs_users_roles, dependent: :destroy
  has_many :users, through: :clubs_users_roles

  has_many :missions, dependent: :destroy
  has_many :notes, through: :missions

  has_many :invitations, dependent: :destroy

  after_create :add_initial_mission

  validates :name, presence: true, allow_blank: false, uniqueness: { case_sensitive: true }
  validates :area, presence: true
  validates :category,
            presence: true,
            inclusion: { in: Club.categories.except(:hornero) },
            if: Proc.new { |club| club.formal? }
  validates :category,
            presence: true,
            inclusion: { in: Club.categories.except(:tero) },
            unless: Proc.new { |club| club.formal? }

  def has_user?(condition)
    users.where(condition).exists?
  end

  def user_invitations(status)
    invitations.where(status: status).includes(:user).map(&:user)
  end

  def add_initial_mission
    missions << Mission.create_initial
  end

  def poster_id
    poster&.id
  end

  def counselor_users
    users.where(clubs_users_roles: { role: Role.find_by(name: Role::COUNSELOR) })
  end

  def member_users
    users - users.where.not(clubs_users_roles: { role: nil })
  end
end
