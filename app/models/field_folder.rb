class FieldFolder < ApplicationRecord
  belongs_to :club

  has_many :entries, dependent: :destroy
end
