class CreatePostHashTags < ActiveRecord::Migration[8.0]
  def change
    create_table :post_hash_tags do |t|
      t.timestamps
      t.belongs_to :post, index: true
      t.belongs_to :hash_tag, index: true
    end
  end
end
