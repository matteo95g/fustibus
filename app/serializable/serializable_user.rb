class SerializableUser < SerializableBase
  attribute :email
  attribute :created_at
  attribute :updated_at
  attribute :is_counselor

  has_many :roles
  belongs_to :current_club, jsonapi_class: 'SerializableCurrentClub'
end
