class SerializableClub < SerializableBase
  attribute :name
  attribute :category
  attribute :area
  attribute :formal
  attribute :description
  attribute :created_at
  attribute :updated_at
  attribute :poster_id
  attribute :counselor_users
  attribute :member_users

  attribute :current_user_roles do
    @object.clubs_users_roles.where(user: @current_user).map{ |club_role| club_role&.role&.name }
  end

  has_one :cover
  has_one :field_folder
  has_many :users
end
