class SharesController < ApplicationController
  before_action :authenticate_user!

  def destroy

    share = Share.find(share_params[:id])
    if share
      if current_user.id == share.sharer.id
        share.destroy
        render json: { message: "successfully deleted" }, status: :ok
      else
        render json: { error: "Only the sharer can delete this share" }, status: :unauthorized
      end
    else
      render json: { error: "couldn't find share" }, status: :not_found
    end
  end
  
  def all_shares_text
    render json: { shares: Share.all.order(created_at: "desc").map{|sh| sh.to_text } }, status: :ok
  end

  private
  def share_params
    params.require(:share).permit(:id)
  end
  
end
