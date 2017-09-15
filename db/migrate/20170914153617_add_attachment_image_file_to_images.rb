class AddAttachmentImageFileToImages < ActiveRecord::Migration[5.1]
  def self.up
    change_table :images do |t|
      t.attachment :image_file
    end
  end

  def self.down
    remove_attachment :images, :image_file
  end
end
