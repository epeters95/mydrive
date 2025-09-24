class HomeController < ApplicationController

  before_action :authenticate_user

  def index
    @shared_with = Share.joins(:user).find(user_id: current_user.id).to_a.map{|sw| sw.to_object }
    render :index
  end

end
