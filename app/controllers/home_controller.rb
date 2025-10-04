class HomeController < ApplicationController

  before_action :authenticate_user

  def index
    @shared_with = current_user.photos_shared_with
    render :index
  end

end
