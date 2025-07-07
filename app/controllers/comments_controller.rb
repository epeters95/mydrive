class CommentsController < ApplicationController

  def destroy

    comment = Comment.find(comment_params[:id])
    if comment
      comment.destroy
    else
      render json: { error: "couldn't find comment" }, status: :not_found
    end
    render json: { message: "successfully deleted" }, status: :ok

  end

  private

  def comment_params
    params.require(:comment).permit(:id)
  end

end
