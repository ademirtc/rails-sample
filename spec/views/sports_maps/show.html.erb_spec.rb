require 'rails_helper'

RSpec.describe "sports_maps/show", type: :view do
  before(:each) do
    @sports_map = assign(:sports_map, SportsMap.create!(
      :title => "Title",
      :description => "MyText"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Title/)
    expect(rendered).to match(/MyText/)
  end
end
