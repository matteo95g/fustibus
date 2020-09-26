require "rails_helper"

RSpec.describe "FieldFolders", type: :request do
  describe "request one field folder" do
    let!(:club) { create(:club) }
    let!(:user) { create(:user, current_club: club) }
    let!(:field_folder) { create(:field_folder, club: club) }

    before { sign_in user }

    it "returns field_folder by id" do
      get current_api_v1_field_folders_path

      expect(response).to be_successful
      expect(json_body['data']['id']).to eq(field_folder.id.to_s)
      expect(json_body['data']['attributes']['clubId']).to eq(club.id)
    end
  end
end
