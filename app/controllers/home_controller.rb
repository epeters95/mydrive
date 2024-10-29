class HomeController < ApplicationController

  # before_action :authenticate_user!

  def index
    # @latest_album = Album.last
    # render :index
    render "devise/sessions/new"
  end

end
