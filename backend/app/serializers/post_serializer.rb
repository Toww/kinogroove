class PostSerializer
  include JSONAPI::Serializer
  attributes :id, :body, :likes_count

  attribute :user_name do |post|
    post.user.name
  end

  attribute :date do |post|
    post.created_at.strftime("%b. %d, %H:%M")
  end

  attribute :liked do |post, params|
    if params && params[:current_user]
      post.liked?(params[:current_user])
    else
      false
    end
  end

  attribute :hash_tags do |post|
    post.hash_tags.map do |hash_tag|
      hash_tag.name
    end
  end

  attribute :song_url do |post, params|
    if post.song.attached? && params && params[:song_url]
      params[:song_url]
    else
      nil
    end
  end
end
