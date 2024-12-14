class AlbumsController < ApplicationController

  before_action :authenticate_user!

  def index
    @albums = Album.all
    @album_objects = @albums.map do |album|
      to_album_object album
    end
    respond_to do |format|
      format.json { render json: { albums: @album_objects } }
      format.html { render :index }
    end
  end

  def get_albums
    @albums = Album.all
    @album_objects = @albums.map do |album|
      to_album_object album
    end
    render json: { albums: @album_objects }
  end

  def show
    @album = Album.find(params[:id])
    @album_object = to_album_object @album
    respond_to do |format|
      format.json do
        render json: { album: @album_object }
      end
      format.html { render :show }
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
        respond_to do |format|
          format.json { render json: { status: :ok } }
          format.html { render :new }
        end
      else
        redirect_to albums_path, notice: 'Album was successfully created.'
      end
    else
      flash[:errors] = @album.errors.full_messages
      render :new
    end
  end

  def edit
    @album = Album.find(params[:id])
    @album_object = to_album_object @album
  end

  def update
    @album = Album.find(params[:id])
    if @album.update(album_params)
      upload_images
      respond_to do |format|
        format.json { render json: { album: @album } }
        format.html { redirect_to edit_album_path(@album), notice: 'Album was successfully updated.' }
      end
    else
      respond_to do |format|
        format.json { render json: { errors: @album.errors.full_messages }, status: :unprocessable_entity }
        format.html do
          flash[:errors] = @album.errors.full_messages
          redirect_to edit_album_path(@album)
        end
      end
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
      photos: album.photos.map{|ph| to_photo_object(ph) }
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
    params.require(:album).permit(:name, :description, images:[]).reject {|key| key == "images"}
  end

  def upload_images
    images = params[:album][:images].drop 1
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
