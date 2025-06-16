class AlbumsController < ApplicationController

  before_action :authenticate_user!

  def index
    if request.format.symbol == :json
      @albums = Album.all
      @album_objects = @albums.map do |album|
        to_album_object album
      end
      render json: { albums: @album_objects }
    else
      render :index
    end
  end

  def show
    if request.format.symbol == :json
      @album = Album.find(params[:id])
      @album_object = to_album_object @album
      render json: { album: @album_object }
    else
      render :show
    end
  end

  def new
    @album = Album.new
  end

  def create
    prams = album_params
    @album = Album.new(prams)
    @album.user_id = current_user.id
    if @album.save
      errors = upload_images
      if !errors.empty?
        flash[:errors] = errors
        render json: { message: "Success" }, status: :ok
      else
        render json: { errors: errors }, status: :unprocessable_entity
      end
    else
      render json: { errors: @album.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def edit
    @album = Album.find(params[:id])
    @album_object = to_album_object @album
  end

  def update
    @album = Album.find(params[:id])
    if @album.update(name: album_params[:name], description: album_params[:description])
      upload_images
      render json: { album: @album }
    else
      render json: { errors: @album.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
  def to_album_object(album)
    {
      name: album.name, 
      path: album_path(album),
      edit_path: edit_album_path(album),
      show_path: album_path(album),
      description: album.description,
      id: album.id,
      photos: album.photos.order(updated_at: "desc").map{|ph| to_photo_object(ph) }
    }
  end

  def to_photo_object(photo)
    {
      name:        photo.name,
      id:          photo.id,
      description: photo.description,
      image_url:   photo.image_url
    }
  end


  def album_params
    params.require(:album).permit(:name, :description, :images).reject {|key| key == "images"}
  end

  def upload_images
    if !params[:album][:images].is_a? Array
      images = [params[:album][:images]]
    else
      images = params[:album][:images].drop 1
    end
    errors = []
    unless images.nil?
      images.each do |img|
        photo = Photo.new(image: img.tempfile, filename: img.original_filename, name: img.original_filename)
        photo.album_id = @album.id
        photo.user_id = current_user.id
        unless photo.save
          errors << photo.errors.full_messages
        end

      end
    end
    return errors
  end

end
