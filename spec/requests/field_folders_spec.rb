require "rails_helper"

RSpec.describe "FieldFolders", type: :request do
  describe "request list of all field folders" do
    let(:count) { rand(1..5) }
    before { create_list(:field_folder, count) }

    it "returns all field folders" do
      get api_v1_field_folders_path

      expect(response).to be_successful
      expect(json_body['data'].size).to eq(count)
    end
  end

  describe "request one field folder by id" do
    let(:club) { create(:club) }
    let(:field_folder) { create(:field_folder, club: club) }

    it "returns field_folder by id" do
      get api_v1_field_folder_path(field_folder.id)

      expect(response).to be_successful
      expect(json_body['data']['id']).to eq(field_folder.id.to_s)
      expect(json_body['data']['attributes']['clubId']).to eq(club.id)
    end
  end

  describe "update one field folder by id" do
    let(:club)   { create(:club) }
    let(:club_2) { create(:club) }
    let(:field_folder) { create(:field_folder, club: club) }

    it "updates field folder by id" do
      put api_v1_field_folder_path(field_folder.id), params: { club_id: club_2.id }

      expect(response).to be_successful
      expect(json_body['data']['attributes']['clubId']).to eq(club_2.id)
    end
  end

  describe "destroy one field folder by id" do
    let(:field_folder) { create(:field_folder) }

    it "returns field_folder by id" do
      delete api_v1_field_folder_path(field_folder.id)

      expect(response).to be_successful
      expect(FieldFolder.all.size).to eq(0)
    end
  end
end
