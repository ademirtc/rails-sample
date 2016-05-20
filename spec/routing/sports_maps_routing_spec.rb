require "rails_helper"

RSpec.describe SportsMapsController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/sports_maps").to route_to("sports_maps#index")
    end

    it "routes to #new" do
      expect(:get => "/sports_maps/new").to route_to("sports_maps#new")
    end

    it "routes to #show" do
      expect(:get => "/sports_maps/1").to route_to("sports_maps#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/sports_maps/1/edit").to route_to("sports_maps#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/sports_maps").to route_to("sports_maps#create")
    end
    
    it "routes to #update via PUT" do
      expect(:put => "/sports_maps/1").to route_to("sports_maps#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/sports_maps/1").to route_to("sports_maps#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/sports_maps/1").to route_to("sports_maps#destroy", :id => "1")
    end

  end
end