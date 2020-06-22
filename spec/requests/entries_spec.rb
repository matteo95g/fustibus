require "rails_helper"

RSpec.describe "Entries", type: :request do
  describe "request list of all entries" do
    let(:count)         { rand(1..5) }
    let(:field_folder)  { create(:field_folder) }

    before { create_list(:entry, count, field_folder: field_folder) }

    it "returns all entries of a field folder" do
      get api_v1_entries_path, params: { field_folder_id: field_folder.id }

      expect(response).to be_successful
      expect(json_body['data'].size).to eq(count)
    end
  end

  describe "request one entry by id" do
    let(:field_folder)  { create(:field_folder) }
    let(:entry)         { create(:entry, field_folder: field_folder) }

    it "returns entry by id" do
      get api_v1_entry_path(entry.id)

      expect(response).to be_successful
      expect(json_body['data']['id']).to eq(entry.id.to_s)
      expect(json_body['data']['attributes']['title']).to eq(entry.title)
      expect(json_body['data']['attributes']['description']).to eq(entry.description)
      expect(json_body['data']['relationships']['fieldFolder']['data']['id']).to eq(field_folder.id.to_s)
    end
  end

  describe "update one entry by id" do
    let(:entry)       { create(:entry) }
    let(:title)       { Faker::Lorem.sentence }
    let(:description) { Faker::Quote.yoda }

    it "updates entry by id" do
      put api_v1_entry_path(entry.id), params: { title: title, description: description }

      expect(response).to be_successful
      expect(json_body['data']['attributes']['title']).to eq(title)
      expect(json_body['data']['attributes']['description']).to eq(description)
    end
  end

  describe "destroy one entry by id" do
    let(:entry) { create(:entry) }

    it "deletes an entry by id" do
      delete api_v1_entry_path(entry.id)

      expect(response).to be_successful
      expect(Entry.all.size).to eq(0)
    end
  end
end
