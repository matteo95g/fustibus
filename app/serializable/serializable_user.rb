class SerializableUser < SerializableBase
  attribute :email
  attribute :created_at
  attribute :updated_at
  attribute :is_counselor
  attribute :names
  attribute :last_names
  attribute :birthday
  attribute :institution
  attribute :about_me
  attribute :phone
  attribute :department
  attribute :grouped_roles

  has_many :roles
  has_one :image, jsonapi_class: 'SerializableImage'
  belongs_to :current_club, jsonapi_class: 'SerializableClub'
end
