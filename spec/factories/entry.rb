FactoryBot.define do
  factory :entry do
    title         { Faker::Lorem.sentence }
    description   { Faker::Quote.yoda }
    date          { Date.today }
    field_folder
  end
end
