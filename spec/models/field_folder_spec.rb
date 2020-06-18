require 'rails_helper'

RSpec.describe FieldFolder, type: :model do
  let(:club) { create(:club) }

  subject { described_class.new(club_id: club.id) }

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end

  it "is not valid without a club_id" do
    subject.club_id = nil
    expect(subject).to_not be_valid
  end
end
