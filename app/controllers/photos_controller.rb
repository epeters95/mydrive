class PhotosController < ApplicationController

  before_action :authenticate_user!

  # def index
  # end

  # def show
  # end

  # def new
  # end

  # def create
  # end

  # def destroy
  # end

  def update

    json_params = JSON.parse(request.raw_post)
    param_photo = json_params["photo"]

    if param_photo
      id = param_photo["id"]
      desc = param_photo["description"]
      @photo = Photo.find(id)
      if @photo
        @photo.update(description: desc)
        render json: {photo_id: @photo.id} , status: :ok
      else
        render json: {error: "Photo not found"}, status: :not_found
      end
    else
      render json: {error: "Photo not provided in request body"}, status: :unprocessable_entity
    end
  end

  private

  def photo_params
    params.require(:photo).permit(:id, :description)
  end

end