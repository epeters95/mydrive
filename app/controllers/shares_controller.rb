class SharesController < ApplicationController

  def all_shares_text
    render json: { shares: Share.all.order(created_at: "desc").map{|sh| sh.to_text } }, status: :ok
  end
  
end
