require "rails_helper"

RSpec.describe Api::V1::MissionsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "api/v1/clubs/1/missions").to route_to("api/v1/missions#index", club_id: "1")
    end

    it "routes to #create" do
      expect(post: "api/v1/clubs/1/missions").to route_to("api/v1/missions#create", club_id: "1")
    end

    it "routes to #update via PUT" do
      expect(put: "api/v1/clubs/1/missions/1").to route_to("api/v1/missions#update", club_id: "1", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "api/v1/clubs/1/missions/1").to route_to("api/v1/missions#destroy", club_id: "1", id: "1")
    end
  end
end
