require "rails_helper"

RSpec.describe Api::V1::FieldFoldersController, type: :routing do
  describe "routing" do
    it "routes to #current" do
      expect(get: "api/v1/field_folders/current").to route_to("api/v1/field_folders#current")
    end
  end
end
