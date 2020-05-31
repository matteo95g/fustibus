class Club < ApplicationRecord
  enum category: { abejitas: 0, colibri: 1, cardenal: 2, churrinche: 3, chaja: 4, nandu: 5, tero: 6, hornero: 7 }
  enum area: { science: 0, technology: 1, social: 2 }

  scope :formal, -> { where(formal: true) }

  validates :name, presence: true, allow_blank: false, uniqueness: { case_sensitive: true }
  validates :area, presence: true
  validates :category, presence: true, inclusion: { in: Club.categories.except(:hornero) }, if: Proc.new { |club| club.formal? }
  validates :category, presence: true, inclusion: { in: Club.categories.except(:tero) }, unless: Proc.new { |club| club.formal? }
end
