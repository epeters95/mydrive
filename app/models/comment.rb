class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :photo

  def self.latest_user_comments
    Comment.all.join(:user).order(updated_at: "desc")
  end


  def to_object
    {
      id:        self.id,
      author:    self.user.name,
      author_id: self.user.id,
      text:      self.text,
      date:      self.created_at.strftime("%FT%T")
    }
  end

end
