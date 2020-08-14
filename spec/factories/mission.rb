FactoryBot.define do
  factory :mission do
    description { Faker::Lorem.paragraph }
    completed   { [true, false].sample }
    club
  end
end
