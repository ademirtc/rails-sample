require 'rails_helper'

RSpec.describe "sports_maps/index", type: :view do
  before(:each) do
    assign(:sports_maps, [
      SportsMap.create!(
        :title => "Title",
        :description => "MyText"
      ),
      SportsMap.create!(
        :title => "Title",
        :description => "MyText"
      )
    ])
  end

  it "renders a list of sports_maps" do
    render
    assert_select "tr>td", :text => "Title".to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
  end
end