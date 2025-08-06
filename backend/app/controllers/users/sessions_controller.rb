class Users::SessionsController < Devise::SessionsController
  include RackSessionsFix

  respond_to :json

  private

  def respond_with(resource, _opts = {})
    render json: {
      status: {
        code: 200,
        message: "Logged in successfully."
      },
      data: {
        user: UserBlueprint.render(resource)
      }
    }, status: :ok
  end

  def respond_to_on_destroy
    if current_user
      render json: {
        status: {
          code: 200,
          message: "Logged out successfully"
        }
      }, status: :ok
    else
      render json: {
        status: {
          code: 401,
          message: "Couldn't find any active session"
        }
      }, status: :unauthorized
    end
  end
end
