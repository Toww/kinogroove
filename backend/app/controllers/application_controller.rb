class ApplicationController < ActionController::API
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [ :name ])
    devise_parameter_sanitizer.permit(:accound_update, keys: [ :name ])
  end

  private
  def augment_post(post)
    song_url = post.song.attached? ? url_for(post.song) : nil
    PostSerializer.new(
      post,
      {
        params: {
          song_url: song_url,
          current_user: current_user
        }
      }).serializable_hash[:data][:attributes]
  end
end
