FactoryBot.define do
  factory :club do
    name     { Faker::FunnyName.name }
    category { Club.categories.except(:hornero, :tero).to_a.sample.first }
    area     { Club.areas.to_a.sample.first }
    formal   { [true, false].sample }
  end
end
