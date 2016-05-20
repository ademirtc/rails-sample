require 'rails_helper'

RSpec.describe "sports_maps/edit", type: :view do
  before(:each) do
    @sports_map = assign(:sports_map, SportsMap.create!(
      :title => "MyString",
      :description => "MyText"
    ))
  end

  it "renders the edit sports_map form" do
    render

    assert_select "form[action=?][method=?]", sports_map_path(@sports_map), "post" do

      assert_select "input#sports_map_title[name=?]", "sports_map[title]"

      assert_select "textarea#sports_map_description[name=?]", "sports_map[description]"
    end
  end
end
