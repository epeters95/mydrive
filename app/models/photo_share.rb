class PhotoShare < ApplicationRecord
  belongs_to :share
  belongs_to :user, dependent: :destroy
  belongs_to :photo

  def to_object
    {
      id: self.id,
      photo: self.photo.to_object,
      user: self.user.to_object,
      created_at: self.created_at
    }
  end
end
