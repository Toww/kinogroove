class Api::V1::SearchController < ApplicationController
  def posts
    # Removing the "#" from hashtag if it exists
    query = params[:q].to_s.sub(/^#/, "")

    @posts = Post
    .joins(:hash_tags)
    .where(
      "hash_tags.name LIKE ? OR hash_tags.name LIKE ?",
      "#{query}%",
      "##{query}%").order(created_at: :desc)

    augmented_posts = @posts.map do |post|
      augment_post(post)
    end

    render json: augmented_posts
  end
end
