class SerializableClub < SerializableBase
  attribute :name
  attribute :category
  attribute :area
  attribute :formal
  attribute :description
  attribute :created_at
  attribute :updated_at
  attribute :poster_id

  attribute :current_user_roles do
    @object.clubs_users_roles.where(user: @current_user).map{ |club_role| club_role&.role&.name }
  end

  has_one :cover
  has_one :field_folder
end
