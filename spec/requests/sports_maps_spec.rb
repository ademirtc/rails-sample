require 'rails_helper'

RSpec.describe "SportsMaps", type: :request do
  describe "GET /sports_maps" do
    it "works! (now write some real specs)" do
      get sports_maps_path
      expect(response).to have_http_status(200)
    end
  end
end
