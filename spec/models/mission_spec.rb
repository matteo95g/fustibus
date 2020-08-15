require 'rails_helper'

RSpec.describe Mission, type: :model do
  let(:club) { create(:club) }

  subject do
    described_class.new(description: Faker::Lorem.paragraph,
                        completed: [true, false].sample,
                        club: club)
  end

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end

  it "is not valid without a description" do
    subject.description = nil
    expect(subject).to_not be_valid
  end
end
