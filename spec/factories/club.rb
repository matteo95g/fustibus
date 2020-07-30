FactoryBot.define do
  factory :club do
    name     { Faker::FunnyName.name }
    category { Club.categories.except(:hornero, :tero).to_a.sample.first }
    area     { Club.areas.to_a.sample.first }
    formal   { [true, false].sample }
    users    { create_list(:user, rand(1..3)) }
  end
end
