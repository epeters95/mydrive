class AlbumsController < ApplicationController

  before_action :authenticate_user!

  def index
    @albums = Album.all
    @album_objects = @albums.map do |album|
      to_album_object album
    end
  end

  def show
    @album = Album.find(params[:id])
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
        render :new
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
      redirect_to edit_album_path(@album), notice: 'Album was successfully updated.'
    else
      flash[:errors] = @album.errors.full_messages
      redirect_to :edit
    end
  end

  private
  def to_album_object(album)
    {
      name: album.name, 
      path: album_path(album),
      edit_path: edit_album_path(album),
      description: album.description,
      id: album.id
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
