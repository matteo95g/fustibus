require "rails_helper"

RSpec.describe Api::V1::ClubsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "api/v1/clubs").to route_to("api/v1/clubs#index")
    end

    it "routes to #show" do
      expect(get: "api/v1/clubs/1").to route_to("api/v1/clubs#show", id: "1")
    end

    it "routes to #create" do
      expect(post: "api/v1/clubs").to route_to("api/v1/clubs#create")
    end

    it "routes to #update via PUT" do
      expect(put: "api/v1/clubs/1").to route_to("api/v1/clubs#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "api/v1/clubs/1").to route_to("api/v1/clubs#destroy", id: "1")
    end
  end
end
