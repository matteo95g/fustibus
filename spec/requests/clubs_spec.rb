require "rails_helper"

RSpec.describe "Clubs", type: :request do
  let(:user) { create(:user) }

  before { sign_in user }
  after { sign_out user }

  describe "request list of all clubs" do
    let(:count) { rand(1..5) }
    before { create_list(:club, count, users: [user]) }

    it "returns all clubs" do
      get api_v1_clubs_path

      expect(response).to be_successful
      expect(json_body['data'].size).to eq(count)
    end
  end

  describe "request one club by id" do
    let(:club) { create(:club, users: [user]) }

    it "returns club by id" do
      get api_v1_club_path(club.id)

      expect(response).to be_successful
      expect(json_body['data']['id']).to eq(club.id.to_s)
      expect(json_body['data']['attributes']['name']).to eq(club.name)
      expect(json_body['data']['attributes']['category']).to eq(club.category)
      expect(json_body['data']['attributes']['area']).to eq(club.area)
      expect(json_body['data']['attributes']['formal']).to eq(club.formal)
    end
  end

  describe "update one club by id" do
    let!(:club_user_role) { create(:clubs_users_role, club: club, user: user, role: role) }

    let(:club)      { create(:club, users: [user]) }
    let(:role)      { create(:role)}
    let(:new_name)  { Faker::FunnyName.name }

    it "updates club by id" do
      put api_v1_club_path(club.id), params: { name: new_name }

      expect(response).to be_successful
      expect(json_body['data']['attributes']['name']).to eq(new_name)
    end
  end

  describe "destroy one club by id" do
    let!(:club_user_role) { create(:clubs_users_role, club: club, user: user, role: role) }

    let(:club) { create(:club, users: [user]) }
    let(:role) { create(:role)}

    it "returns club by id" do
      delete api_v1_club_path(club.id)

      expect(response).to be_successful
      expect(Club.all.size).to eq(0)
    end
  end
end
