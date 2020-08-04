class Role < ApplicationRecord
  COUNSELOR = "orientador"

  has_and_belongs_to_many :users
end
