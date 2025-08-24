class CommentsController < ApplicationController

  def destroy

    comment = Comment.find(comment_params[:id])
    if comment
      if current_user.id == comment.user.id
        comment.destroy
        render json: { message: "successfully deleted" }, status: :ok
      else
        render json: { error: "Only the author can delete this comment" }, status: :unauthorized
      end
    else
      render json: { error: "couldn't find comment" }, status: :not_found
    end
  end

  def index
    comments = Comment.all.order(created_at: "desc").group(:user_id)
    render json: { comments: comments.map{|cm| cm.to_object }}, status: :ok
  end

  def latest_comments
    render json: { comments: Comment.latest_user_comments.map{|cm| cm.to_object }}, status: :ok
  end

  private

  def comment_params
    params.require(:comment).permit(:id)
  end

end
