require "rails_helper"

RSpec.describe Api::V1::EntriesController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "api/v1/entries").to route_to("api/v1/entries#index")
    end

    it "routes to #show" do
      expect(get: "api/v1/entries/1").to route_to("api/v1/entries#show", id: "1")
    end

    it "routes to #create" do
      expect(post: "api/v1/entries").to route_to("api/v1/entries#create")
    end

    it "routes to #update via PUT" do
      expect(put: "api/v1/entries/1").to route_to("api/v1/entries#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "api/v1/entries/1").to route_to("api/v1/entries#destroy", id: "1")
    end
  end
end
