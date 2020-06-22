require 'rails_helper'

RSpec.describe Entry, type: :model do
  let(:field_folder) { create(:field_folder) }

  subject { described_class.new(field_folder_id: field_folder.id) }

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end

  it "is not valid without a field_folder_id" do
    subject.field_folder_id = nil
    expect(subject).to_not be_valid
  end
end
