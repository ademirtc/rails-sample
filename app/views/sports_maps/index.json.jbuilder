json.array!(@sports_maps) do |sports_map|
  json.extract! sports_map, :id, :title, :description
  json.url sports_map_url(sports_map, format: :json)
end
