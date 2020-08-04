class SerializableUser < SerializableBase
  attribute :email
  attribute :created_at
  attribute :updated_at
  attribute :is_counselor

  has_many :roles
end
