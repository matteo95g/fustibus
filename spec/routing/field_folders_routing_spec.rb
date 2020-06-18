require "rails_helper"

RSpec.describe Api::V1::FieldFoldersController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "api/v1/field_folders").to route_to("api/v1/field_folders#index")
    end

    it "routes to #show" do
      expect(get: "api/v1/field_folders/1").to route_to("api/v1/field_folders#show", id: "1")
    end

    it "routes to #create" do
      expect(post: "api/v1/field_folders").to route_to("api/v1/field_folders#create")
    end

    it "routes to #update via PUT" do
      expect(put: "api/v1/field_folders/1").to route_to("api/v1/field_folders#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "api/v1/field_folders/1").to route_to("api/v1/field_folders#destroy", id: "1")
    end
  end
end
