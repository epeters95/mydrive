class HomeController < ApplicationController

  before_action :authenticate_user

  def index
    @shared_with = []

    @shared_with << Share.joins(:user).find(user_id: current_user.id).to_a.map{|sw| sw.to_object }
    # TODO: verify each model reference used by view is in nested json e.g. photo.user.name
    render :index
  end

end
