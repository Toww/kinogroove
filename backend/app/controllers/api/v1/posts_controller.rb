class Api::V1::PostsController < ApplicationController
  before_action :authenticate_user!

  before_action :set_post, only: %i[ show update destroy ]

  # GET /posts
  def index
    @posts = Post.order(created_at: :desc)

    posts_with_songs = @posts.map do |post|
      if post.song.attached?
        post.as_json.merge(song_url: url_for(post.song))
      else
        post.as_json.merge(song_url: nil)
      end
    end

    render json: posts_with_songs
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
    @post = Post.new(post_params)

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

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.expect(post: [ :title, :body, :song ])
    end
end
