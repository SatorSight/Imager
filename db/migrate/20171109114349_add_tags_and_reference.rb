class AddTagsAndReference < ActiveRecord::Migration[5.1]
  def change
    create_table :tags do |t|
      t.string :title
 
      t.timestamps
    end

    create_join_table :images, :tags
  end
end
