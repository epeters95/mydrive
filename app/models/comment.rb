class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :photo


  def to_object
    {
      id:     self.id,
      author: self.user.name,
      text:   self.text,
      date:   self.created_at.strftime("%FT%T")
    }
  end

end
