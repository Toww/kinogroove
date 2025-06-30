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

    posts_with_songs_and_hashtags = @posts.map do |post|
      if post.song.attached?
        post
        .as_json(methods: :hash_tags)
        .merge(song_url: url_for(post.song))
      else
        post
        .as_json(methods: :hash_tags)
        .merge(song_url: nil)
      end
    end

    render json: posts_with_songs_and_hashtags
  end
end
