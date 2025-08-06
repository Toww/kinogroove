class Users::RegistrationsController < Devise::RegistrationsController
  include RackSessionsFix

  respond_to :json

  private

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: {
        status: {
          code: 200,
          message: "Signed up successfully."
        },
        data: UserBlueprint.render(resource)
      }, status: :ok
    else
      render json: {
        errors: resource.errors.full_messages
      }, status: :unprocessable_entity
    end
  end
end
