class Api::V1::PostsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_post, only: %i[ show update destroy like ]

  # GET /posts
  def index
    posts_per_page = 10
    @posts = Post.order(created_at: :desc)

    render json: {
      posts: paginate_posts(@posts, posts_per_page),
      total_count: Post.count,
      posts_per_page: posts_per_page
    }
  end

  # GET /posts/1
  def show
    if @post.song.attached?
      render json: @post.as_json.merge(song_url: url_for(@post.song))
    else
      render json: @post.as_json.merge(song_url: nil)
    end
  end

  # POST /posts
  def create
    unless post_params[:song].present?
      render json: { error: "Your post must contain a song." }, status: :unprocessable_entity
      return
    end

    @post = current_user.posts.new(post_params)

    if @post.save
      render json: @post, status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy!
  end

  # Liking a post
  def like
    result = @post.toggle_like(current_user)

    if result
      render json: {
        success: true,
        liked: result[:liked],
        likes_count: result[:count]
      }
    else
      render json: {
        success: false,
        errors: [ "Unable to toggle like button" ]
      }, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:body, :song)
    end

    # Paginating posts response
    def paginate_posts(posts, posts_per_page)
      paginated_posts = posts.page(params[:page]).per(posts_per_page)
      paginated_posts.map do |post|
        augment_post(post)
      end
    end
end
