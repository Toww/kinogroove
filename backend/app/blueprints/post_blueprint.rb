class PostBlueprint < Blueprinter::Base
  identifier :id

  fields :body, :likes_count

  association :user, blueprint: UserBlueprint

  field :date do |post|
    post.created_at.in_time_zone("Europe/Paris").strftime("%b. %d, %H:%M")
  end

  field :liked do |post, options|
    options[:current_user] ? post.liked?(options[:current_user]) : false
  end

  field :hash_tags do |post|
    post.hash_tags.map do |hash_tag|
      hash_tag.name
    end
  end

  field :is_my_post do |post, options|
    options[:current_user] ? post.user_id == options[:current_user].id : false
  end

  field :song_url do |post, options|
    post.song.attached? && options[:song_url] ? options[:song_url] :nil
  end
end
