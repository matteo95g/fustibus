require "rails_helper"

RSpec.describe Api::V1::EntriesController, type: :routing do

  describe "routing" do
    it "routes to #index" do
      expect(get: "/api/v1/field_folders/1/entries").to route_to("api/v1/entries#index", field_folder_id: "1")
    end

    it "routes to #show" do
      expect(get: "/api/v1/field_folders/1/entries/1").to route_to("api/v1/entries#show", field_folder_id: "1", id: "1")
    end

    it "routes to #create" do
      expect(post: "/api/v1/field_folders/1/entries").to route_to("api/v1/entries#create", field_folder_id: "1")
    end

    it "routes to #update via PUT" do
      expect(put: "/api/v1/field_folders/1/entries/1").to route_to("api/v1/entries#update", field_folder_id: "1", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/api/v1/field_folders/1/entries/1").to route_to("api/v1/entries#destroy", field_folder_id: "1", id: "1")
    end
  end
end
