class CreateSportsMaps < ActiveRecord::Migration
  def change
    create_table :sports_maps do |t|
      t.string :title
      t.text :description

      t.timestamps null: false
    end
  end
end
