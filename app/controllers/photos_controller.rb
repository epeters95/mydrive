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
        if current_user.id == @photo.user.id

          @photo.update(update_hash) unless update_hash.empty?
        else
          return render json: { error: "Only the author can modify this photo" }, status: :unauthorized

        end
        
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

  def latest_commented
    render json: { photo: Photo.latest_commented.to_object }, status: :ok
  end

  def share_photo
    # TODO: create view
    photo_id = params[:photo_id]
    user_id = params[:user_id]
    share_ids = params[:share_ids]

    if share_ids.is_a? Array && !photo_id.nil? && !user_id.nil?
      share = Share.new(sharer_id: user_id)


      if share.save
        result = true
        share_ids.each do |s_id|
          photo_share = PhotoShare.new(photo_id: photo_id, share_id: share.id, user_id: s_id)
          result = result && photo_share.save
        end

        if result
          render json: { message: "Success" }, status: :ok
        else
          render json: { message: "Failure" }, status: :unprocessable_entity
        end
      else
        render json: { error: photo_share.errors.join }, status: :unprocessable_entity
      end
    else
      render json: { error: "Invalid request" }, status: :unprocessable_entity
    end
  end


  private

  def photo_params
    params.require(:photo).permit(:id, :description)
  end

end