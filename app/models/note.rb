class Note < ApplicationRecord
  has_many :note_sections, dependent: :destroy
  belongs_to :user_mission
  has_one :mission, through: :user_mission

  def mission_id
    mission&.id
  end

  def owner
    user = user_mission&.user

    return unless user

    "#{user.names} #{user.last_names}"
  end
end
