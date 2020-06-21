class JwtBlacklist < ApplicationRecord
  include Devise::JWT::RevocationStrategies::Denylist
end
