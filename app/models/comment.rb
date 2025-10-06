class Comment < ApplicationRecord
  belongs_to :user, dependent: :destroy
  belongs_to :photo

  def self.latest_user_comments
    Comment.all.joins(:user).order(updated_at: "desc")
  end

  def to_text
    "#{self.created_at.strftime("%FT%T")} - #{self.user.name}: #{self.text}"
  end


  def to_object
    {
      id:        self.id,
      author:    self.user.name,
      author_id: self.user.id,
      text:      self.text,
      date:      self.created_at.strftime("%FT%T"),
      to_text:   self.to_text 
    }
  end

end
