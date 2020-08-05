require "rails_helper"

RSpec.describe Club, type: :model do
  let!(:formal) { [true, false].sample }
  let(:categories) { formal ? Club.categories.except(:hornero) : Club.categories.except(:tero) }

  subject do
    described_class.new(name: Faker::FunnyName.name,
                        category: categories.to_a.sample.second,
                        area: Club.areas.to_a.sample.second,
                        formal: rand(0..1))
  end

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end

  it "is not valid without a name" do
    subject.name = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without an category" do
    subject.category = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without an area" do
    subject.area = nil
    expect(subject).to_not be_valid
  end

  context "when is formal" do
    it "is not valid if category is hornero" do
      subject.formal = true
      subject.category = :hornero
      expect(subject).to_not be_valid
    end
  end

  context "when is not formal" do
    it "is not valid if category is hornero" do
      subject.formal = false
      subject.category = :tero
      expect(subject).to_not be_valid
    end
  end
end
