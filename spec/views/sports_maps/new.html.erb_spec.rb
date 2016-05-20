require 'rails_helper'

RSpec.describe "sports_maps/new", type: :view do
  before(:each) do
    assign(:sports_map, SportsMap.new(
      :title => "MyString",
      :description => "MyText"
    ))
  end

  it "renders new sports_map form" do
    render

    assert_select "form[action=?][method=?]", sports_maps_path, "post" do

      assert_select "input#sports_map_title[name=?]", "sports_map[title]"

      assert_select "textarea#sports_map_description[name=?]", "sports_map[description]"
    end
  end
end
