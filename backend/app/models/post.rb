class Post < ApplicationRecord
  # Associations
  belongs_to :user
  has_many :likes, dependent: :destroy
  has_many :post_hash_tags
  has_many :hash_tags, through: :post_hash_tags

  # Active Record
  has_one_attached :song

  # Validations
  validates :body, presence: true, length: { maximum: 100 }
  validate :correct_file_type

  # Callbacks
  after_commit :create_hash_tags, on: :create

  # Songs
  def correct_file_type
    if song.attached? === false || !song.content_type.in?([ "audio/mpeg", "audio/mp3" ])
      errors.add("Your post must have a valid song attached.")
    end
  end

  # Likes
  def liked?(user)
    self.likes.exists?(user_id: user.id)
  end

  def likes_count
    self.likes.count
  end

  def toggle_like(user)
    existing_like = self.likes.find_by(user_id: user.id)

    if existing_like
      existing_like.destroy
      { liked: false, count: self.likes_count }
    else
      self.likes.create(user: user)
      { liked: true, count: self.likes_count }
    end
  end

  # Hashtags
  def create_hash_tags
    # This regex gets the word without the "#", and works with accents.
    # The scan result is flattened ti fix array of arrays caused by
    # the  single capture groups in the regex.
    tags = self.body.scan(/(?<!\S)#([\p{L}\p{M}0-9_-]+)/).flatten

    tags.each do |tag|
      self.hash_tags.create(name: tag.downcase)
    end
  end
end
