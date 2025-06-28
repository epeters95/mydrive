class PhotosController < ApplicationController

  before_action :authenticate_user!
  protect_from_forgery prepend: true

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
      update_hash = {}
      ["id", "description"].each do |att|
        update_hash[att] = param_photo[att] unless param_photo[att].nil?
      end
      comment_param = param_photo["comment"]
      @photo = Photo.find(params["id"])
      if @photo
        @photo.update(update_hash) unless update_hash.empty?
        if comment_param
          if @photo.comments.create(user_id: current_user.id, text: comment_param)
            render json: { photo_id: @photo.id }, status: :ok
          else
            render json: { error: "Error publishing comment to photo" }, status: :unprocessable_entity
          end
        else
          render json: { photo_id: @photo.id }, status: :ok
        end
      else
        render json: { error: "Photo not found" }, status: :not_found
      end
    else
      render json: { error: "Photo not provided in request body" }, status: :unprocessable_entity
    end
  end

  private

  def photo_params
    params.require(:photo).permit(:id, :description)
  end

end