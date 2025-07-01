class ApplicationController < ActionController::API
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [ :name ])
    devise_parameter_sanitizer.permit(:accound_update, keys: [ :name ])
  end

  private
  def augment_post(post, include_hash_tags)
    json_post = include_hash_tags ? post.as_json(methods: :hash_tags) : post.as_json

    if post.song.attached?
      json_post.merge(song_url: url_for(post.song))
    else
      json_post.merge(song_url: nil)
    end
  end

  def paginate_posts(posts, posts_per_page, include_hashes)
    paginated_posts = posts.page(params[:page]).per(posts_per_page)
    paginated_posts.map do |post|
      augment_post(post, include_hashes)
    end
  end
end
