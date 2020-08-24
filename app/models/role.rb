class Role < ApplicationRecord
  COUNSELOR = 'orientador'

  def self.counselor
    find_by(name: COUNSELOR)
  end
end
