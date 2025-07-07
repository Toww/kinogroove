class PostSerializer
  include JSONAPI::Serializer
  attributes :id, :body, :likes_count

  attribute :user do |post|
      {
        id: post.user.id,
        name: post.user.name
      }
  end

  attribute :date do |post|
    post.created_at.in_time_zone("Europe/Paris").strftime("%b. %d, %H:%M")
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

  attribute :is_my_post do |post, params|
    params && params[:current_user] ? post.user_id == params[:current_user].id : false
  end

  attribute :song_url do |post, params|
    if post.song.attached? && params && params[:song_url]
      params[:song_url]
    else
      nil
    end
  end
end
