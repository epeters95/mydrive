# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   debugger
  # end

  # POST /resource/sign_in
  def create
    resource = warden.authenticate(scope: resource_name)
    if resource
      cookies[:signed_in] = {
        value: true,
        expires: 1.day.from_now,
        domain: 'localhost'
      }
      render json: {success: true}, status: :ok
    else
      render json: {error: "Invalid credentials"}, status: :unauthorized
    end
  end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  end
end
