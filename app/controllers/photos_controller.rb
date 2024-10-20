class PhotosController < ApplicationController

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
    @photo = Photo.find(photo_params[:id])
    if @photo
      @photo.update(description: photo_params[:description])
      render json: {photo_id: @photo.id} , status: :ok
    else
      render json: {error: "Photo not found"}, status: :not_found
    end
  end

  private

  def photo_params
    params.require(:photo).permit(:id, :description)
  end

end