class Invitation < ApplicationRecord
  enum status: [:pending, :accepted, :rejected]

  belongs_to :club
  belongs_to :user, primary_key: :email, foreign_key: :email
end
