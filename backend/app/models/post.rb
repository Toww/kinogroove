class Post < ApplicationRecord
  # Associations
  has_many :post_hash_tags
  has_many :hash_tags, through: :post_hash_tags

  # Active Record
  has_one_attached :song

  # Callbacks
  after_commit :create_hash_tags, on: :create

  def create_hash_tags
    # This regex gets the word without the "#", and works with accents.
    # The scan result is flattened ti fix array of arrays caused by
    # the  single capture groups in the regex.
    tags = self.body.scan(/(?<!\S)#([\p{L}\p{M}0-9_-]+)/).flatten

    tags.each do |tag|
      self.hash_tags.create(name: tag)
    end
  end
end
